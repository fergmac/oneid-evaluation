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
