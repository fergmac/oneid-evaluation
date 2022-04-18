import { useLayoutEffect } from "react";
import Image from 'next/image';

function VeriffProvider({}) {
    useLayoutEffect(() => {
        const veriff = Veriff({
            host: 'https://stationapi.veriff.com',
            apiKey: '5c681933-2c4c-456d-a8c5-81e2cdc7718e',
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
            vendorData: JSON.parse(localStorage.getItem("userData")).userId
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
