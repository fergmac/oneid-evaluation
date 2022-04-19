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

    try {
        const response = await fetch("https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY
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
        })
        console.log("Fetch to User Data Endpoint - Response: ", response.json())
        res.status(200).json({ msg: 'User Data Submitted.', response: response.json() });
    } catch (error) {
        console.log("User Data Submit Error: ", error);
        res.status(400).json({ msg: "User Data Submit Error: ", error: error });
    }

    // fetch("https://2un07fmcmd.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_user", {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": process.env.API_KEY
    //     },
    //     body: JSON.stringify(
    //         {
    //             "user_id": req.body.userId,
    //             "first_name": req.body.firstName,
    //             "middle_name": req.body.middleName,
    //             "last_name": req.body.lastName,
    //             "date_of_birth": req.body.dateOfBirth
    //         }
    //     )
    // }).then((res) => {
    //     console.log("Fetch to User Data Endpoint - Response: ", res.json())
    // }).catch((error) => console.log("OneID Provider Error: ", error));


}

export default handler;