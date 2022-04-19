export default function handler(req, res) {
    const userData = JSON.parse(req.body);

    fetch("https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,

            },
            body: JSON.stringify(
                {
                    "user_id": userData.userId,
                    "first_name": userData.firstName,
                    "middle_name": userData.middleName,
                    "last_name": userData.lastName,
                    "date_of_birth": userData.dateOfBirth
                }
            )
    }).then((response) => {
        console.log("Fetch to User Data Endpoint - Response: ", response.json())
        res.status(200).json({ msg: 'User Data Submitted.', res: response.json() }); 
    }).catch((error) => {
        console.log("User Data Submit Error: ", error);
        res.status(error.status).json({ msg: "User Data Submit Error: ", err: error });
    })
}