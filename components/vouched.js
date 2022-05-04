import { useEffect, useLayoutEffect, useState } from "react";
import Image from 'next/image';
import styles from '../styles/vouched.module.css';


function VouchedProvider() {
    const appId = process.env.NEXT_PUBLIC_VOUCHED_APP_ID
    const callbackUrl = process.env.NEXT_PUBLIC_VOUCHED_CALLBACK_URL

    useLayoutEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        var vouched = Vouched({
            appId: `${appId}`,
            // your webhook for POST verification processing
            callbackURL: `${callbackUrl}`,
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
            // theme
            theme: {
                name: 'verbose',
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
                    baseColor: '#12826A',
                    font: 'Helvetica Neue, Helvetica, Arial, sans-serif',
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
                    "sessionStartTime": new Date().getTime(),
                    "sessionEndTime": "",
                    "sessionResponseTime": ""
                }

                fetch('api/vouched-events-webhook', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => {
                        localStorage.setItem("vouchSubmitted", true);
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
                    "sessionEndTime": new Date().getTime(),
                    "sessionResponseTime": ""
                }

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
        vouched.mount("#vouched-root");
    });

    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_vouched.svg" alt="OneID provider logo" />
            <div>
                <div id='vouched-root'></div>
            </div>
        </div>
    );

}

export default VouchedProvider;
