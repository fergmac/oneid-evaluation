import {useLayoutEffect, useEffect} from 'react';
import Image from 'next/image';

function YotiProvider() {
  useEffect(() => {
    const iframe = document.getElementById ('iframeId').contentWindow;
    const origin = 'https://api.yoti.com/';
    window.addEventListener('message', event => {
      const sessionId ='a4202495-9fae-42ea-999d-7e50aa5cdfb8'
      const sessionToken='feb9ae99-ee69-4b4e-af18-151e86c1755f'
      if (event.data.eventType === 'STARTED' && event.origin === origin) {
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
      <Image
        className="logo"
        width="50"
        height="50"
        src="/logo_yoti.png"
        alt="OneID provider logo"
      />
      <div>
        <iframe
          src={process.env.YOTI_IFRAME_URL}
          allow="camera"
          width="100%"
          height="100%"
          style={{
            height: '605px;',
            width: '100%;',
            border: 'none',
          }}
          id="iframeId"
        />
      </div>
    </div>
  );
}

export default YotiProvider;
