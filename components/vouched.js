import { useEffect, useLayoutEffect, useState } from "react";
import Image from 'next/image';


function VouchedProvider() {
    const [showVouchedRoot, setShowVouchedRoot] = useState(false);

    useLayoutEffect(() => {
        const userData = localStorage.getItem("userData");

        var vouched = Vouched({
            appId: "~qjjNu47bOm6zoYO*2GFY-V#2sYG#y",
            // your webhook for POST verification processing
            callbackURL: 'https://oneid-evaluation-bckyzddv6-fergmac.vercel.app/api/vouched-webhook',
            // mobile handoff
            crossDevice: true,
            crossDeviceQRCode: true,
            sandbox: true,
            // theme
            theme: {
                name: 'avant',
            },
            onInit: ({ token, job }) => {

                data = {
                    "user_id": userData.id,
                    "session_id": job.token,
                    "response": "",
                    "provider": "vouched",
                    "session_start_time": "test-start-time",
                    "session_end_time": "",
                    "session_response_time": ""
                }

                console.log("Vouched Session onInit");

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: data
                })
                    .then((res) => {
                        console.log("response post fetch", res)
                    }).catch((err) => console.log("Error: ", err));
                
            },
            onDone: ({ token, obj }) => {
                data = {
                    "user_id": userData.id,
                    "session_id": job.token,
                    "response": "",
                    "provider": "vouched",
                    "session_start_time": "",
                    "session_end_time": "test-end-time",
                    "session_response_time": ""
                }

                console.log("Vouched Session onDone");

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: data
                })
                    .then((res) => {
                        console.log("response post fetch", res)
                    }).catch((err) => console.log("Error: ", err));
                
            }
        });
        vouched.mount("#vouched-root");
    });

    // useEffect(() => {
    //     window.addEventListener('message', (event) => {
    //         if (event.data.eventType === 'STARTED') {
    //             console.log("Vouched Session Message - Started.");
    //         }
    //         console.log("Event Data: ", event)
    //     });
    // })

    const toggleVouched = () => {
        setShowVouchedRoot(true);
    }

    return (
        <div className="section">
            <Image className="logo" width="300" height="200" src="/logo_vouched.png" alt="OneID provider logo" />
            <div>
                <button id='vouched-button' onClick={toggleVouched}>VERIFY NOW</button>
                {showVouchedRoot ? <div id='vouched-root' className="full-width"></div> : null}
            </div>
        </div>
    );

}

export default VouchedProvider;
