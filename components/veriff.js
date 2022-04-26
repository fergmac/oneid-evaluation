import { useLayoutEffect } from "react";
import Image from 'next/image';

function VeriffProvider() {
    useLayoutEffect(() => {
        const veriff = Veriff({
            host: process.env.NEXT_PUBLIC_VERIFF_HOST,
            apiKey: process.env.NEXT_PUBLIC_VERIFF_API_KEY,
            parentId: 'veriff-button',
            onSession: function (err, response) {
                window.veriffSDK.createVeriffFrame({ url: response.verification.url });
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
