import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../components/userForm';
import Header from '../components/header'


function HomePage() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('userData') !== null) {
            router.push('/id-verification');
        }
    });

    return (
        <>
            <Header />
            <UserForm />
        </>
    );
}

export default HomePage;
