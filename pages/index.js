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
            <div className="content">
                <UserForm />
            </div>
        </>
    );
}

export default HomePage;
