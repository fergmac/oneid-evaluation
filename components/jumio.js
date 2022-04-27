import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../styles/jumio.module.css';

function JumioProvider() {
    const [showProvider, setShowProvider] = useState(false);
    const [jumioUrl, setJumioUrl] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        function receiveMessage(event) {
            console.log("Event Data: ", event.data);
            // var data = window.JSON.parse(event.data);
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

    const toggleProvider = () => {
        setShowProvider(true);
    }
    
    return (
        <div className="section">
            <Image className="logo" width="100" height="50" src="/logo_jumio.svg" alt="OneID provider logo" />
            {
                showProvider ?
                    <iframe loading="lazy" src={jumioUrl} width="70%" height="650px" allow="camera;fullscreen;accelerometer;gyroscope;magnetometer" allowFullScreen></iframe>
                    :
                    null
            }
            <button className={styles.button} onClick={toggleProvider}>VERIFY NOW</button>
        </div>
    );

}

export default JumioProvider;
