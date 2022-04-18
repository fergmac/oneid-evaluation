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

    console.log("submit user data serverless function", req.body)
    // const url = process.env.USER_API_ENDPOINT
    // const apiKey = process.env.API_KEY

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": apiKey
    //     },
    //     body: req.body
    // }).then((res) => {
    //     console.log("Response: ", res)
    // }).catch((error) => console.log("OneID Provider Error: ", error));

    console.log("User Data: ", req.body)
    
    res.status(200).json({ msg: 'User Data Submitted' })
}

export default handler;