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

    fetch(process.env.USER_API_ENDPOINT, {
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
    }).then((res) => {
        console.log("Response: ", res)
    }).catch((error) => console.log("OneID Provider Error: ", error));

    
    res.status(200).json({ msg: 'User Data Submitted.' });
}

export default handler;