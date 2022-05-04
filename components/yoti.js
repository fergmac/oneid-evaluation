import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function YotiProvider() {
  const origin = 'https://api.yoti.com';
  const router = useRouter();
  const [showYotiIframe, setShowYotiIframe] = useState(false);
  const [yotiIframeUrl, setYotiIframeUrl] = useState(new URL(process.env.NEXT_PUBLIC_YOTI_IFRAME_URL));


  const _setYotiIframeUrl = (sessionId, clientSessionToken) => {
    yotiIframeUrl.searchParams.set("sessionID", sessionId);
    yotiIframeUrl.searchParams.set("sessionToken", clientSessionToken);
    console.log("🚀 ~ file: yoti.js ~ line 36 ~ YotiProvider ~ yotiIframeUrl", yotiIframeUrl)
    setYotiIframeUrl(yotiIframeUrl)
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
          console.log("Iframe postMessage initiated with sessionId", res.sessionId)
          _setYotiIframeUrl(res.sessionId, res.clientSessionToken)
          setShowYotiIframe(true)
        }
        else {
          console.error("Error:", res)
        }
      }).catch(err => console.error("Error while launching session", err))
    window.addEventListener('message', event => {
      if (event.data.eventType === 'STARTED' && event.origin === origin) {
        console.log("Event started!!")
      }
    });

    window.addEventListener(
      'message',
      function (event) {
        if (event.data.eventType === 'SUCCESS') {
          console.log('Success', event.data.eventType)
        } else if (event.data.eventType === "ERROR") {
          const errorCode = event.data.eventCode;
          console.log("🚀 ~ file: yoti.js ~ line 45 ~ useEffect ~ errorCode", errorCode)
        }
      }
    );

    return function cleanup() {
      window.removeEventListener('message', event)
    }
  }, []);

  return (
    <div className="section">
      <Image className="logo" width="100" height="50" src="/logo_yoti.svg" alt="OneID provider logo" />

      {showYotiIframe ?
        (
          <iframe
            src={yotiIframeUrl}
            loading="lazy"
            allow="camera"
            width="100%"
            height="750"
            style={{
              height: '805px',
              width: '100%',
              border: 'none',
            }}
            id="yoti-iframe"
            data-hj-allow-iframe=""
            allowFullScreen
          />)
        :
        (<label htmlFor="yoti-iframe">Loading...</label>)}
    </div>
  );
}

export default YotiProvider;
