import { useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/vouched.module.css';
import { useRouter } from 'next/router';

function YotiProvider() {
  const origin = 'https://api.yoti.com';
  const router = useRouter();

  // Get session details from API GW endpoint
  async function getYotiSession (userId = "defaultYoti") {
    const response = await fetch('api/yoti-session', {
      method: "GET",
      params: {
        user_id: userId
      }
    })
    const sessionResponse = await response.json()
    return sessionResponse
  }
  // Set the session details in localStorage
  async function setYotiSessionDetails(userId) {
    const resultSession = await getYotiSession(userId);
    localStorage.setItem("yotiSessionId", resultSession.sessionId)
    localStorage.setItem("yotiSessionToken", resultSession.clientSessionToken)
  }

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    !userData && router.push("/")

    const userId = JSON.parse(localStorage.getItem("userId"));
    const iframe = document.getElementById('iframeId').contentWindow;

    setYotiSessionDetails(userId)

    // Launch the Iframe
    const sessionId = localStorage.getItem("yotiSessionId")
    const sessionToken = localStorage.getItem("yotiSessionToken")
    window.addEventListener('message', event => {
      // For some reason this doesn't work in the first load
      // Hence the meaningless conditional check below
      if (event.data.eventType === 'STARTED' || true) {
        iframe.postMessage (
          {
            eventType: 'INIT_SESSION',
            sessionID: sessionId,
            sessionToken: sessionToken,
          },
          origin
        );
      }
    });

    window.addEventListener ('message', function (event) {
      if (event.data.eventType === 'SUCCESS') {
        // Act upon success
      } else if (event.data.eventType === 'ERROR') {
        // Act upon error
        const errorCode = event.data.eventCode;
      }
    });

    return function cleanup() {
      window.removeEventListener('message', event)
    }
  });

  return (
    <div className="section">
      <Image className="logo" width="100" height="50" src="/logo_yoti.png" alt="OneID provider logo" />

        <iframe
          src='https://api.yoti.com/idverify/v1/web/index.html'
          allow="camera"
          width="100%"
          height="750"
          style={{
            height: '805px',
            width: '100%',
            border: 'none',
          }}
          id="iframeId"
          allowFullScreen
        />
      </div>
  );
}

export default YotiProvider;
