import Script from 'next/script'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../components/userForm';


function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('userData') !== null) {
            router.push('/id-verification');
        }
    });

    return (
        <>
            <UserForm />
        </>
    );
}

export default HomePage;
