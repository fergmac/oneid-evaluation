import { useLayoutEffect, useEffect } from "react";
import Image from 'next/image';

function YotiProvider() {

  const url = 'https://api.yoti.com/idverify/v1/web/index.html?sessionID=fc6bd482-99fa-4ee2-b502-e4a396604f23&sessionToken=1c3e8ea4-0e05-4311-96d7-6a872af97595'
  const oldUrl = "https://api.yoti.com/sandbox/idverify/v1/web/index.html"
    useEffect(() =>{
        const yoti=window.Yoti.Share.init({
          'elements': [{
            'clientSdkId': "28d8660a-ac5c-4111-9d9a-2eb3e24a2c3b",
            // 'scenarioId':"xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            'domId': "yoti-button",
            displayLearnMoreLink: false,

          }]
        })

        return yoti.destroy
      }, [])

        // const iframe = document.getElementById('iframeId').contentWindow;
        // const origin = 'https://api.yoti.com';
        // window.addEventListener(
        //     'message',
        //     event => {
        //         if (event.data.eventType === 'STARTED' && event.origin === origin) {
        //             iframe.postMessage({
        //                 eventType: 'INIT_SESSION',
        //                 sessionID: 'someSessionId',
        //                 sessionToken: 'someSessionToken',
        //             },
        //                 origin
        //             );
        //         }
        //     }
        // );
        // window.addEventListener('message',
        //     function (event) {
        //         console.log('Message received', event.data);

        //         if (event.data.eventType === 'SUCCESS') {
        //             // Act upon success
        //         } else if (event.data.eventType === 'ERROR') {
        //             // Act upon error
        //             const errorCode = event.data.eventCode;
        //         }
        //     }
        // );
  return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_yoti.png" alt="OneID provider logo" />
            <div>
          <iframe
                src={url}
                allow="camera"
                width="100%"
                height="100%"
                style={{
                    "height": "605px;",
                    "width": "100%;",
                    "border": "none"
                }}
                id="iframeId">
                </iframe>
                <div id="yoti-button"></div>
            </div>
        </div>
    );

}

export default YotiProvider;
