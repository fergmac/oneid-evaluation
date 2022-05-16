import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

function YotiProvider() {
  const origin = 'https://api.yoti.com';
  const router = useRouter();
  const iframeRef = useRef();

  const [showYotiIframe, setShowYotiIframe] = useState(false);
  const [yotiIframeUrl, setYotiIframeUrl] = useState(new URL(process.env.NEXT_PUBLIC_YOTI_IFRAME_URL));
  const sessionId = useRef('')

  const yotiSessionIframe = iframeRef.current;

  const getSessionIdFromIframeUrl = (url) => {
    if (!url) {
      return null
    };
    let params = new URLSearchParams(url.src.split('?')[1])
    sessionId.current = params.get('sessionID')
    return params.get('sessionID')
  }

  const _setYotiIframeUrl = (sessionId, clientSessionToken) => {
    yotiIframeUrl.searchParams.set("sessionID", sessionId);
    yotiIframeUrl.searchParams.set("sessionToken", clientSessionToken);
    setYotiIframeUrl(yotiIframeUrl)
  }

  const updateYotiStatusAPIGateway = (data) => {

    fetch('api/yoti-events-webhook', {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    .then((res) => {
      localStorage.setItem("yotiSubmitted", true);
    })
    .catch((err) => console.error("Yoti Status API Submission Error: ", err));
  }

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    !userData && router.push("/")

    fetch('api/yoti-session', {
        method: 'POST',
        body: userData
      }).then(res => res.json())
      .then(res => {
        if (res.sessionId && res.clientSessionToken) {
          _setYotiIframeUrl(res.sessionId, res.clientSessionToken)
          setShowYotiIframe(true)
          sessionId.current = res.sessionId
          const userId = JSON.parse(userData)?.userId
          const data = {
            "userId": userId,
            "sessionId": res.sessionId,
            "response": "",
            "provider": "yoti",
            "sessionStartTime": new Date().toISOString(),
            "sessionResponseTime": ""
          }
          updateYotiStatusAPIGateway(data)
        } else {
          console.error("Yoti session creation error:", res)
        }
      }).catch(err => console.error("Error while launching session", err))

    window.addEventListener(
      'message',
      function (event) {
        if (event.data.eventType === 'SUCCESS') {
          const userId = JSON.parse(localStorage.getItem("userData"))?.userId
          const data = {
            "userId": userId,
            "sessionId": sessionId.current,
            "response": "",
            "provider": "yoti",
            "sessionEndTime": new Date().toISOString(),
            "sessionResponseTime": ""
          }
          updateYotiStatusAPIGateway(data)
          window.parent.location.replace("https://oneid-evaluation.vercel.app/success/");
        } else if (event.data.eventType === "ERROR") {
          window.parent.location.replace("https://oneid-evaluation.vercel.app/failed/");
        }
      }
    );

    return function cleanup() {
      window.removeEventListener('message', event)
    }
  }, []);

  return (
    <div className="section">
      {showYotiIframe ?
        (
          <iframe
            ref={iframeRef}
            src={yotiIframeUrl}
            loading="lazy"
            allow="camera"
            width="100%"
            height="750"
            style={{
              height: '550px',
              width: '100%',
              border: 'none',
            }}
            id="yoti-iframe"
            data-hj-allow-iframe=""
            allowFullScreen
          />)
        :
        (<label style={{ "textAlign": "center" }} htmlFor="yoti-iframe">Loading...</label>)}
    </div>
  );
}

export default YotiProvider;
