import { useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';
import { hotjar } from 'react-hotjar';
import styles from '../styles/idVerification.module.css';

function OneIDEvaluation() {
    const router = useRouter();
    const hotjarId = 2948417;
    const hotjarSnippetVersion = 6;

    useEffect(() => {
        {/* Hotjar Tracking Code for OneID Vendor Evaluation */}
        hotjar.initialize(hotjarId, hotjarSnippetVersion);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        if (!userData) {
            router.push("/");
        }

        if (JSON.parse(localStorage.getItem("userDataSubmitted")) === false) {
            fetch('api/submit-user-data', {
                method: 'POST',
                body: userData
            })
                .then((res) => {
                    console.log("response post fetch", res)
                    localStorage.setItem("userDataSubmitted", JSON.stringify(true));
                }).catch((err) => console.log("Error: ", err));
        }

    });

    return (
        <div className={styles.providerLinks}>
            <Link href="/jumio-verification">
                <a className={styles.provider}>
                    <Image className="logo" width="100" height="50" src="/logo_jumio.svg" alt="OneID provider logo" />
                </a>
            </Link>
            <Link href="/vouched-verification">
                <a className={styles.provider}>
                    <Image className="logo" width="100" height="50" src="/logo_vouched.svg" alt="OneID provider logo" />
                </a>
            </Link>
            <Link href="/veriff-verification">
                <a className={styles.provider}>
                    <Image className="logo" width="100" height="50" src="/logo_veriff.svg" alt="OneID provider logo" />
                </a>
            </Link>
            <Link href="/yoti-verification">
                <a className={styles.provider}>
                    <Image className="logo" width="100" height="50" src="/logo_yoti.png" alt="OneID provider logo" />
                </a>
            </Link>
        </div>);
}

export default OneIDEvaluation;
