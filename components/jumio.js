import Image from 'next/image';
import { useRef, useEffect } from 'react';

function JumioProvider() {
    // let jumioIframeSrc = 'https://certn-test.netverify.com/web/v4/app?authorizationToken=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAB3MMQvCMBCG4f-S2YM0uaaJm0OFLg6lCI4xdweC1pJGUMT_bnT5hpeH7634uStqqxrX6mDRGGO9UxsVB6pVSLvoAwKeuwjYeYSIUcCehW1ryGvXVJxGlqoLrwXSYy33G2e4zIXzHK-QWTjznPgn_7eu84mRHERqG8DABMFKAtFC1tbxgSpeptdS9aGfjv047E_q8wW4oULXrwAAAA.ZYZEaotTtamrfPZIuiYxSnC1qSyOaDGNYFzxv5IIxfj4H3Qr2QA8sFGBUH5mfz0MBcB4eU4d15qaBYvayYH_2A&locale=en';

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        function receiveMessage(event) {
            console.log("Event Data: ", event.data);
            // var data = window.JSON.parse(event.data);
            // console.log('ID Verification Web was loaded in an iframe.');
            // console.log('auth-token:', data.authorizationToken);
            // console.log('event-type:', data.eventType);
            // console.log('date-time:', data.dateTime);
            // console.log('workflow-execution-id:', data.workflowExecutionId);
            // console.log('account-id:', data.accountId);
            // console.log('customer-internal-reference:', data.customerInternalReference);
            // console.log('value:', data.payload.value);
            // console.log('metainfo:', data.payload.metainfo);
        }
        window.addEventListener("message", receiveMessage, false);

        fetch('api/jumio-initiate-id-verification', {
            method: 'POST',
            body: userData
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("Jumio Init Data: ", res);
                // jumioIframeElement. == res.data.redirectUrl;
                console.log("iframe: ", res.data.redirectUrl);
                jumioIframeSrc == res.data.redirectUrl
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
            
    })
    
    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_jumio.svg" alt="OneID provider logo" />
            <div>Integrate Jumio</div>
            <iframe loading="lazy" src="https://certn-test.netverify.com/web/v4/app?authorizationToken=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAB3MMQvCMBCG4f-S2YOkSdOcm0OFLg6lCI5n7gKC1pJGUMT_bnT5hpeH763kuStqq4xvNVqHxiI6tVE0cK1EHWrWDI03BO6cCEj7CCGRb1JnQmxDxXGUVHWRtUB8rOV-kwyXuUie6QpZkmSZo_zk_9Z3IYpjD8StAYfCgDZFSDqxtXUCcsXL9FqqPvTTsR-H_Ul9vurXQpuvAAAA.wsJkg5Zy19A7YSU_3EnmlFuL6dObZzuRaPH00EJPmKdNw_i7VCCnFxKGPxVKghAVErkwvbfXmppoKbtTkss6_Q&locale=en" width="70%" height="650px" allow="camera;fullscreen;accelerometer;gyroscope;magnetometer" allowFullScreen></iframe>
        </div>
    );

}

export default JumioProvider;
