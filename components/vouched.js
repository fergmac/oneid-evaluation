import { useEffect, useLayoutEffect, useState } from "react";
import Image from 'next/image';


function VouchedProvider() {
    const [showVouchedRoot, setShowVouchedRoot] = useState(false);

    useLayoutEffect(() => {
        var vouched = Vouched({
            appId: "~qjjNu47bOm6zoYO*2GFY-V#2sYG#y",
            // your webhook for POST verification processing
            callbackURL: "http://localhost:3000/api/vouched-response-webhook",
            // mobile handoff
            crossDevice: true,
            crossDeviceQRCode: true,
            sandbox: true,
            // theme
            theme: {
                name: 'avant',
            },
            properties: [
                { "userId": JSON.parse(localStorage.getItem("userData"))?.userId}
            ],
            onInit: ({ token, job }) => {
                console.log("Vouched Session onInit");
                const userId = JSON.parse(localStorage.getItem("userData"))?.userId
                const data = {
                    "userId": userId,
                    "sessionId": token,
                    "response": "",
                    "provider": "vouched",
                    "sessionStartTime": "test-start-time",
                    "sessionEndTime": "",
                    "sessionResponseTime": ""
                }

                localStorage.setItem(`${token}`, JSON.stringify(data));   
            },
            onDone: ({ token, obj }) => {
                console.log("Vouched Session onDone");

                let updatedData = JSON.parse(localStorage.getItem(`${token}`));
                updatedData["sessionEndTime"] = "test-end-time"

                localStorage.setItem(`${token}`, JSON.stringify(updatedData));

                const customEvent = new CustomEvent("vouchedSubmit", { "detail": token});
                window.dispatchEvent(customEvent);
            }
        });
        vouched.mount("#vouched-root");
    });

    useEffect(() => {
        window.addEventListener('vouchedSubmit', (event) => {
            // TODO: this event is triggering multiple times
            if (!localStorage.getItem("vouchSubmitted")) {
                console.log("Vouch Has Been Submitted.", event)

                const data = JSON.parse(localStorage.getItem(`${event.detail}`));

                console.log("Data: ", data);
                    fetch('api/vouched-events-webhook', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                        .then((res) => {
                            console.log("response post fetch", res)
                            localStorage.setItem("vouchSubmitted", true);
                        })
                        .catch((err) => console.log("Error: ", err));
            }
        });
    })

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
