import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import JumioProvider from '../components/jumio.js';

function JumioVerfication() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        if (!userData) {
            router.push("/");
        }    
    })

    return (
        <div className="content">
            <JumioProvider />
        </div>);
}

export default JumioVerfication;
