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

    const userId = JSON.parse(localStorage.getItem("userId"));
    const iframe = document.getElementById('iframeId').contentWindow;


    fetch('api/yoti-session', {
      method: "GET",
      params: {
        user_id: userId
      }
    }).then(res => res.json())
      .then(res => {
        iframe.postMessage({
            eventType: 'INIT_SESSION',
            sessionID: res.sessionId,
            sessionToken: res.clientSessionToken,
          },
          origin
        );
    }).catch(err => console.error("err", err))

    window.addEventListener('message', event => {
      if (event.data.eventType === 'STARTED' && event.origin === origin) {
        console.log("wohoo started!!")
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
        loading="lazy"
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
