async function handler(req, res) {
    const userData = JSON.parse(req.body);

    try {
        const response = await fetch("https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_user", {
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
        })
        res.status(200).json({ msg: 'User Data Submitted.'}); 
    } catch (error) {
        res.status(error.status).json({ msg: "User Data Submit Error: "});
    }
}

export default handler;