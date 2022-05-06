import Link from 'next/link';

function SuccessPage() {
    return (
        <div className="success-page">
            <div>Your ID Verification was a success!</div>
            <Link href="/id-verification">
                <a>Return to identity verification provider list page.</a>
            </Link>
        </div>
    )
}

export default SuccessPage;