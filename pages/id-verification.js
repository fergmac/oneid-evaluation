import { useEffect } from "react";
import { useRouter } from 'next/router';
import VeriffProvider from '../components/veriff.js';
import OneIDScripts from './one-id-scripts';

function OneIDEvaluation() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        fetch('api/submit-user-data', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(userData)
        })
            .then((res) => {
                console.log("response post fetch", res)
            });
    });

    return (
        <div className="section-container">
            {/* <OneIDScripts /> */}
            <h1>OneID Provider Evaluation</h1>
            <VeriffProvider />
        </div>);
}

export default OneIDEvaluation;