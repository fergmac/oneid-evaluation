import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/userForm.module.css';

function UserForm() {
    const router = useRouter();

    const saveUserData = (formData) => {
        if (window.localStorage) {
            const userData = {
                "userId": `${uuidv4()}`,
                "firstName": formData.get('firstName'),
                "middleName": formData.get('middleName'),
                "lastName": formData.get('lastName'),
                "dateOfBirth": formData.get('dateOfBirth')
            }
            localStorage.setItem("userData", JSON.stringify(userData))
            localStorage.setItem("userDataSubmitted", JSON.stringify(false));
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(regForm);

        saveUserData(formData);

        router.push("/id-verification/")
    }

    return (
        <div className={styles.formWrapper}>
            <form action="" method="" id="regForm" name="regForm" onSubmit={handleFormSubmit}>
                <div className={styles.privacyStatement}>
                    <h4>Please enter the following information as it appears on your government issued ID.</h4>
                    <div >Privacy Statement: We&apos;re collecting this information so we can measure how well the ID verification platforms capture this information on your identity document. This data will be anonymized to hide personal identifying information. All raw data will be deleted from our records within 30 days of ending the platform evaluation user testing phase. </div>
                </div>

                <fieldset>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" required />
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name:</label>
                        <input type="text" name="middleName" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" name="lastName" required />
                    </div>
                    <label htmlFor="dateOfBirth">Date Of Birth:</label>
                    <input type="date" name="dateOfBirth" min="1940-01-01" max="2022-06-01" required />
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    )
}

export default UserForm;
