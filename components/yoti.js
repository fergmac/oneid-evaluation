import {useLayoutEffect, useEffect} from 'react';
import Image from 'next/image';

function YotiProvider() {
  const origin = 'https://api.yoti.com/sandbox/idverify/v1/web';

  const sessionId ='0bec8691-2991-42cc-b9cc-d1b1f2741899'
  const sessionToken='829af125-7693-446e-9982-aa2d09912dc2'


  const yotiIframeUrl = new URL(process.env.NEXT_PUBLIC_YOTI_IFRAME_URL);
  yotiIframeUrl.searchParams.append("sessionID", sessionId);
  yotiIframeUrl.searchParams.append("sessionToken", sessionToken);

  useEffect(() => {
    const iframe = document.getElementById ('iframeId').contentWindow;
    window.addEventListener('message', event => {
      if (event.data.eventType === 'STARTED') {
        iframe.postMessage (
          {
            eventType: 'INIT_SESSION',
            sessionID: {sessionID: sessionId},
            sessionToken: {sessionToken: sessionToken},
          },
          origin
        );
      }
    });
    window.addEventListener ('message', function (event) {
      console.log ('Message received', event.data);
      if (event.data.eventType === 'SUCCESS') {
        // Act upon success
      } else if (event.data.eventType === 'ERROR') {
        // Act upon error
        const errorCode = event.data.eventCode;
      }
    });
  });
  return (
    <div className="section">
      <div className="yoti-logo-container">
        <Image src='/logo_yoti.png'
          alt="OneID provider logo"
          layout="fill" className="image" />
      </div>

      <div>
        <iframe
          src={yotiIframeUrl}
          allow="camera"
          width="100%"
          height="750"
          style={{
            height: '805px;',
            width: '100%;',
            border: 'none',
          }}
          id="iframeId"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default YotiProvider;
