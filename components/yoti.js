import { useEffect } from "react";
import Image from 'next/image';

function Yoti() {
    useEffect(() => {
        // Yoti.Share.init({
        //     elements: [
        //         {
        //         domId: "yoti-button",
        //         scenarioId: "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        //         clientSdkId: "28d8660a-ac5c-4111-9d9a-2eb3e24a2c3b",
        //         displayLearnMoreLink: true,
        //         }
        //     ]
        // });
        

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
    });
        
    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_yoti.png" alt="OneID provider logo" />
            <div>
                <iframe
                src="https://api.yoti.com/idverify/v1/web/index.html"
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

export default Yoti;
