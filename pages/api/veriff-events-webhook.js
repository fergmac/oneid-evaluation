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
    
    try {
        const response = await fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
                "Host": "https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com"
            },
            body: JSON.stringify(data)
        });
        console.log("Fetch to OneID Endpoint - Response: ", response.json());
        res.status(200).json({ msg: 'Veriff Events Webhook Data Submitted: ', response: response.json() });
    } catch (error) {
        console.log("Veriff Event Data Submit Error: ", error);
        res.status(error.status).json({ msg: "Veriff Event Data Submit Error: ", error: error });
    }
}

export default handler;