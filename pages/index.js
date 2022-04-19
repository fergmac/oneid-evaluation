import Script from 'next/script'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../components/userForm';
import IdVerification from './id-verification';


function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('userData') !== null) {
            router.push('/id-verification');
        }
    });

    return (
        <>
            <div className="sidebar">
                <a className="active" href="home">Home</a>
                <a href="veriff">Veriff</a>
                <a href="yoti">Yoti</a>
                <a href="vouched">Vouched</a>
                <a href="jumio">Jumio</a>
                <a href="my-sessions">My Sessions</a>

            </div>

            <div className="content">
                <UserForm />
            </div>
        </>
    );
}

export default HomePage;
