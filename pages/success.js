import Link from 'next/link';

function SuccessPage() {
    return (
        <div className="success-page">
            <div>Your ID Verification was a success!</div>
            <Link href="/id-verification">
                <a>Return to ID verification provider list.</a>
            </Link>
        </div>
    )
}

export default SuccessPage;