import Script from 'next/script'
import UserForm from '../components/userForm';

function HomePage() {


    return (
        <>
            <Script src="https://cdn.veriff.me/sdk/js/1.1/veriff.min.js" strategy="beforeInteractive"/>
            <Script src="https://cdn.veriff.me/incontext/js/v1/veriff.js" strategy="beforeInteractive" />
            <UserForm />
        </>
    );
}

export default HomePage;
