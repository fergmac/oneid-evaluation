import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../styles/jumio.module.css';

function JumioProvider() {
    const [jumioUrl, setJumioUrl] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        fetch('api/jumio-initiate-id-verification', {
            method: 'POST',
            body: userData
        })
            .then((res) => res.json())
            .then((res) => {
                setJumioUrl(res.data.redirectUrl);
            })
            .catch((error) => {
                console.log("Error: ", error);
            })

    }, [])

    useEffect(() => {
        const origin = "https://certn-test.netverify.com"
        const successUrl = "https://oneid-evaluation.vercel.app/success/"
        const errorUrl = "https://oneid-evaluation.vercel.app/failed/"
        const verificationStatus = {
            SUCCESS: "success",
            ERROR: "error"
        }
        
        window.addEventListener("message", (event) => {
            let data;
            
            if (event?.origin !== origin) {
                return;
            }
    
            data = JSON.parse(event?.data);
            if (data?.payload.value === verificationStatus?.SUCCESS) {
                window.parent.location.replace(successUrl);
            }
            if (data?.payload.value === verificationStatus?.ERROR) {
                window.parent.location.replace(errorUrl);
            }
        })
    }, []);
    
    return (
        <div className="section">
            <iframe
                className={styles.jumioIframe}
                loading="lazy"
                src={jumioUrl}
                width="70%"
                height="650px"
                allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
                data-hj-allow-iframe=""
                allowFullScreen>    
            </iframe>
        </div>
    );

}

export default JumioProvider;
