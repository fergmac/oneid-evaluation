import { useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/vouched.module.css';
import { useRouter } from 'next/router';

function YotiProvider() {
  const origin = 'https://api.yoti.com';
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    !userData && router.push("/")

    const iframe = document.getElementById('yoti-iframe').contentWindow;


    fetch('api/yoti-session', {
        method: 'POST',
        body: userData
      }).then(res => res.json())
      .then(res => {
        if (res.sessionId) {
          console.log("Iframe postMessage initiated with sessionId", res.sessionId)
          iframe.postMessage({
            eventType: 'INIT_SESSION',
            sessionID: res.sessionId,
            sessionToken: res.clientSessionToken,
          },
            origin
          );
        }
      }).catch(err => console.error("Error while launching session", err))
      window.addEventListener('message', event => {
        if (event.data.eventType === 'STARTED' && event.origin === origin) {
          console.log("Event started!!")
        }
      });

      window.addEventListener(
        'message',
        function(event) {
          console.log('Message received', event.data);
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
  },[]);

  return (
    <div className="section">
      <Image className="logo" width="100" height="50" src="/logo_yoti.svg" alt="OneID provider logo" />

        <iframe
        src='https://api.yoti.com/idverify/v1/web/index.html'
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
        />
    </div>
  );
}

export default YotiProvider;
