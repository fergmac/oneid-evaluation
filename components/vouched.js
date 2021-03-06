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
            properties: [
                {
                    name: "userId", value: userData?.userId,
                },
            ],
            onInit: ({ job }) => {
                const userId = JSON.parse(localStorage.getItem("userData"))?.userId
                localStorage.setItem("vouchedSessionId", job?.id);
                const data = {
                    "userId": userId,
                    "sessionId": job?.id,
                    "provider": "vouched",
                    "timeStamp": new Date().toISOString(),
                    "action": "onInit"
                }

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => res.json())
                    .then((data) => console.log("Success: ", data))
                    .catch((err) => console.error("Error: ", err));
            },
            onDone: (job) => {
                const sessionId = localStorage.getItem("vouchedSessionId")
                localStorage.removeItem("vouchedSessionId");
                const userId = JSON.parse(localStorage.getItem("userData"))?.userId
                const data = {
                    "userId": userId,
                    "sessionId": sessionId,
                    "provider": "vouched",
                    "timeStamp": new Date().toISOString(),
                    "action": "onDone"
                }

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => res.json())
                    .then((data) => console.log("Success: ", data))
                    .catch((err) => console.error("Error: ", err));
                

                if (job.result.success) {
                    window.location.replace("https://oneid-evaluation.vercel.app/success/");
                } else{
                    window.location.replace("https://oneid-evaluation.vercel.app/failed/");
                }
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
