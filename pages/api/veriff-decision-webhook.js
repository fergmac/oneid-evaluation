import Cors from 'cors'

const cors = Cors({
    methods: ['POST', 'PATCH', 'HEAD'],
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
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
    await runMiddleware(req, res, cors);
    // const url = process.env.ONEID_API_ENDPOINT
    // const apiKey = process.env.API_KEY

    console.log("Veriff Decision Webhook: ", req)

    // fetch(url, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": apiKey
    //     },
    //     body: req.body
    // }).then((res) => {
    //     console.log("Response: ", res)
    // }).catch((error) => console.log("OneID Provider Error: ", error));


    res.status(200).json({ msg: 'Veriff Decision Webhook Data Submitted' })
}

export default handler;