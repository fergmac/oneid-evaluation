import { useEffect } from "react";


function VouchedProvider() {
    const appId = process.env.NEXT_PUBLIC_VOUCHED_APP_ID
    const callbackUrl = process.env.NEXT_PUBLIC_VOUCHED_CALLBACK_URL

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        var vouched = Vouched({
            appId: `${appId}`,
            // your webhook for POST verification processing
            callbackURL: "https://oneid-evaluation.vercel.app/api/vouched-response-webhook",
            // mobile handoff
            crossDevice: true,
            crossDeviceQRCode: true,
            crossDeviceSMS: true,
            includeBarcode: true,
            includeBackId: true,
            face: 'both',
            showTermsAndPrivacy: false,
            showProgressBar: false,
            liveness: 'straight',
            maxRetriesBeforeNext: 1,
            // theme
            theme: {
                name: 'verbose',
                baseColor: '#12826A',
                font: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            },
            content: {
                overlayHeader: 'Support',
                middleBackIdCapturedInstructions: '',
                crossDeviceShowOff: true,
                qrDesktopLink: '',
                carouselCompanyText: [],
                carouselCompanyImg: [],
                upperSuccess: '',
                upperFailure: '',
                lowerSuccess: '',
                lowerFailure: '',
            },
            userConfirmation: {
                confirmImages: true,
            },
            properties: [
                {
                    name: "userId", value: userData?.userId,
                },
            ],
            onInit: ({ token, job }) => {
                console.log("Vouched Session onInit");
                const userId = JSON.parse(localStorage.getItem("userData"))?.userId
                const data = {
                    "userId": userId,
                    "sessionId": token,
                    "response": "",
                    "provider": "vouched",
                    "sessionStartTime": new Date().toISOString(),
                    "sessionEndTime": "",
                    "sessionResponseTime": ""
                }

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => {
                        // localStorage.setItem("vouchSubmitted", true);
                    })
                    .catch((err) => console.log("Error: ", err));
 
            },
            onDone: ({ token, obj }) => {
                console.log("Vouched Session onDone");

                const userId = JSON.parse(localStorage.getItem("userData"))?.userId
                const data = {
                    "userId": userId,
                    "sessionId": token,
                    "response": "",
                    "provider": "vouched",
                    "sessionStartTime":"",
                    "sessionEndTime": new Date().toISOString(),
                    "sessionResponseTime": ""
                }

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => {
                        console.log("response post fetch", res)
                        // localStorage.setItem("vouchSubmitted", true);
                    })
                    .catch((err) => console.log("Error: ", err));
            }
        });
        vouched.mount("#vouched-root");
    });

    return (
        <div className="section">
            <div>
                <div id='vouched-root'></div>
            </div>
        </div>
    );

}

export default VouchedProvider;
