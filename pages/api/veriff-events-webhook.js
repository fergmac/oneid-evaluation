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
    await runMiddleware(req, res, cors);
    // const url = process.env.ONEID_API_ENDPOINT
    // const apiKey = process.env.API_KEY

    let timeStamp = new Date();
    timeStamp = timeStamp.toUTCString().split(" ")['4'];

    console.log("Veriff Events Webhook: ", req);
    console.log("timestamp", timeStamp);

    let data;
    const provider_response = req.body;

    if (provider_response.action === 'started') {
        data = {
            "user_id": provider_response.vendorData,
            "session_id": provider_response.id,
            "start_time": timeStamp
        }
    }

    if (provider_response.action === 'submitted') {
        data = {
            "user_id": provider_response.vendorData,
            "session_id": provider_response.id,
            "stop_time": timeStamp
        }
    }

    // fetch(url, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": apiKey
    //     },
    //     body: data
    // }).then((res) => {
    //     console.log("Veriff Events Webhook: ", res)
    // }).catch((error) => console.log("OneID Provider Error: ", error));

    res.status(200).json({ msg: 'Veriff Events Webhook Data Submitted: ', data: data})
}

export default handler;