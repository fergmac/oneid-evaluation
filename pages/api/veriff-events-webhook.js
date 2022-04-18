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

// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    await runMiddleware(req, res, cors)

    console.log("Veriff Events Webhook: ", req)
    // const url = process.env.ONEID_API_ENDPOINT
    // const apiKey = process.env.API_KEY

    // fetch(url, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": apiKey
    //     },
    //     body: req.body
    // }).then((res) => {
    //     console.log("Veriff Events Webhook: ", res)
    // }).catch((error) => console.log("OneID Provider Error: ", error));

    res.status(200).json({ msg: 'Veriff Events Webhook Data Submitted' })

    // TODO:
    // 1. Parse provider responses
    // 2. forward identity verification data to aws api gateway endpoint
}

export default handler;