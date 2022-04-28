import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import VouchedProvider from '../components/vouched.js';

function VouchedVerfication() {
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("userData");

        if (!userData) {
            router.push("/");
        }    
    })

    return (
        <div className="content">
            <VouchedProvider />
        </div>);
}

export default VouchedVerfication;
