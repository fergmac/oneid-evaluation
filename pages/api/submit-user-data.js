import Cors from 'cors'

const cors = Cors({
    methods: ['POST', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
        if (result instanceof Error) {
            return reject(result)
        }

        return resolve(result)
        })
    })
}

async function handler(req, res) {
    await runMiddleware(req, res, cors)
    console.log("Submit User Data: ", req.body)

    fetch("https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
                "Host": "https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com"
            },
            body: JSON.stringify(
                {
                    "user_id": req.body.userId,
                    "first_name": req.body.firstName,
                    "middle_name": req.body.middleName,
                    "last_name": req.body.lastName,
                    "date_of_birth": req.body.dateOfBirth
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

export default handler;