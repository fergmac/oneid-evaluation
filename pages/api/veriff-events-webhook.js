// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    console.log("Event Webhook - Provider Data", req.body);

    const provider_data = req.body
    let data;
    // let timeStamp = new Date();
    // timeStamp = timeStamp.toUTCString().split(" ")['4'];

    console.log("Veriff Events Webhook: ", req);
    console.log("timestamp", timeStamp);

    if (provider_data.action === 'started') {
        data = {
            "user_id": provider_data.vendorData,
            "session_id": provider_data.id,
            "start_time": "test"
        }
    }

    if (provider_data.action === 'submitted') {
        data = {
            "user_id": provider_data.vendorData,
            "session_id": provider_data.id,
            "stop_time": "test"
        }
    }
    
    fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY,
        },
        body: JSON.stringify(data)
    }).then((response) => {
        console.log("Fetch to OneID Endpoint - Response: ", response.json());
        res.status(200).json({ msg: 'Veriff Events Webhook Data Submitted: ', response: response.json() });
    }).catch(() => {
        console.log("Veriff Event Data Submit Error: ", error);
        res.status(error.status).json({ msg: "Veriff Event Data Submit Error: ", error: error });
    });
}

export default handler;