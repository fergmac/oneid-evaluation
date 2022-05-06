import Link from 'next/link';

function FailedPage() {
    return (
        <div className="failed-page">
            <div>Your ID Verification failed!</div>
            <Link href="/id-verification">
                <a>Return to identity verification provider list page.</a>
            </Link>
        </div>
    )
}

export default FailedPage;