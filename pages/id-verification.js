import { useEffect } from "react";
import { useRouter } from 'next/router';
import VouchedProvider from '../components/vouched.js';
import VeriffProvider from '../components/veriff.js';
import JumioProvider from '../components/jumio.js';

function OneIDEvaluation() {
    const router = useRouter();

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
        <div className="content">
            <h3>OneID Provider Evaluation</h3>
            <JumioProvider />
            <VouchedProvider />
            <VeriffProvider />
        </div>);
}

export default OneIDEvaluation;
