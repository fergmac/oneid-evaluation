import Image from 'next/image';
import { useState, useEffect } from 'react';

function JumioProvider() {
    const [jumioUrl, setJumioUrl] = useState(null);

    useEffect(() => {
        // TODO: should this be initialized somewhere else, on page refresh we start from the beginning again
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
                setJumioUrl(res.data.redirectUrl);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
            
    }, [])
    
    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_jumio.svg" alt="OneID provider logo" />
            <div>Integrate Jumio</div>
            <iframe loading="lazy" src={jumioUrl} width="70%" height="650px" allow="camera;fullscreen;accelerometer;gyroscope;magnetometer" allowFullScreen></iframe>
        </div>
    );

}

export default JumioProvider;
