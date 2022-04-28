import Link from 'next/link'
import styles from '../styles/header.module.css'

function Header() {
    return (
        <div className={styles.header}>
            <Link href="/id-verification">
                <a>
                    <h3>OneID Provider Evaluation</h3>
                </a>
            </Link>
        </div>
    )
}

export default Header;