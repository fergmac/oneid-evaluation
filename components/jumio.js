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
                console.error("Error: ", error);
            })

    }, [])

    useEffect(() => {
        // below origin updated during testing from "https://certn-test.netverify.com"
        const origin = "https://certn-test.web.amer-1.jumio.ai"
        const successUrl = "https://oneid-evaluation.vercel.app/success/"
        const errorUrl = "https://oneid-evaluation.vercel.app/failed/"
        const verificationStatus = {
            SUCCESS: "success",
            ERROR: "error"
        }

        window.addEventListener("message", (event) => {
            let data;

            if (!event?.origin.includes("https://certn-test")) {
                return;
            }
            
            try {
                data = event?.data
                data = JSON.parse(data);
                if (data?.payload.value === verificationStatus?.SUCCESS) {
                    window.parent.location.replace(successUrl);
                }
                if (data?.payload.value === verificationStatus?.ERROR) {
                    window.parent.location.replace(errorUrl);
                }
            } catch (error) {
                console.error("Error Parsing Jumio Event JSON: ", error);
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
