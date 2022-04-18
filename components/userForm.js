import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

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
            localStorage.setItem("userDataSubmitted", false);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(myForm);

        saveUserData(formData);

        router.push("/id-verification/")
    }

    return (
        <>
            <h2>Please enter the following information as it appears on your ID.</h2>
            <form action="" method="" id="myForm" name="myForm" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" required />
                </div>
                <div>
                    <label htmlFor="middleName">Middle Name:</label>
                    <input type="text" name="middleName" required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" required />
                </div>
                <label htmlFor="dateOfBirth">Date Of Birth:</label>
                <input type="date" name="dateOfBirth" min="1940-01-01" max="2022-06-01" required />
                <div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </>
    )
}

export default UserForm;