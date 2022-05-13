import { useLayoutEffect } from "react";
import Image from 'next/image';

function VeriffProvider() {
    const veriffHost = process.env.NEXT_PUBLIC_VERIFF_HOST
    const verifyApiKey = process.env.NEXT_PUBLIC_VERIFF_API_KEY
    useLayoutEffect(() => {
        const veriff = Veriff({
            host: `${veriffHost}`,
            apiKey: `${verifyApiKey}`,
            parentId: 'veriff-button',
            onSession: function (err, response) {
                window.veriffSDK.createVeriffFrame({
                    url: response.verification.url,
                    onEvent: function (msg) {
                        console.log("OneEvent Message: ", msg);
                        switch(msg) {
                            case "FINISHED":
                                window.location.replace("https://oneid-evaluation.vercel.app/success/");
                                break;
                        }    
                    }
                });
            }
        });
        veriff.setParams({
            person: {
                givenName: ' ',
                lastName: ' '
            },
            vendorData: JSON.parse(localStorage.getItem("userData"))?.userId
        });
        veriff.mount();
    });

    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_veriff.svg" alt="OneID provider logo" />
            <div id="veriff-button"></div>
        </div>
    );

}

export default VeriffProvider;
