import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import VeriffProvider from '../components/veriff.js';

function VeriffVerification() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        if (!userData) {
            router.push("/");
        }    
    })

    return (
        <div className="content">
            <VeriffProvider />
        </div>);
}

export default VeriffVerification;
