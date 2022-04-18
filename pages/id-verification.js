import { useEffect } from "react";
import { useRouter } from 'next/router';
import VeriffProvider from '../components/veriff.js';
import OneIDScripts from './one-id-scripts';
import Script from 'next/script'

function OneIDEvaluation() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        if (JSON.parse(localStorage.getItem("userDataSubmitted")) === false) {
            fetch('api/submit-user-data', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(userData)
            })
                .then((res) => {
                    console.log("response post fetch", res)
                    localStorage.setItem("userDataSubmitted", JSON.stringify(true));
                });
        }

    });

    return (
        <div className="section-container">
            {/* <OneIDScripts /> */}
            <h1>OneID Provider Evaluation</h1>
            <VeriffProvider />
        </div>);
}

export default OneIDEvaluation;