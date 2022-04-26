async function handler(req, res) {
    const userData = JSON.parse(req.body);
    const url = process.env.API_USER_DATA_URL
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,

            },
            body: JSON.stringify(
                {
                    "user_id": userData?.userId,
                    "first_name": userData?.firstName,
                    "middle_name": userData?.middleName,
                    "last_name": userData?.lastName,
                    "date_of_birth": userData?.dateOfBirth
                }
            )
        })
        res.status(response?.status).json({ msg: 'User Data Submitted.'}); 
    } catch (error) {
        res.status(error?.status).json({ msg: "User Data Submit Error: "});
    }
}

export default handler;