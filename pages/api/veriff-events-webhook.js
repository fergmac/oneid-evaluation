// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    console.log("Event Webhook - Provider Data: ", req.body);
    console.log("Event Type: ", req.body.action);

    const provider_data = req.body
    let data;
    // let timeStamp = new Date();
    // timeStamp = timeStamp.toUTCString().split(" ")['4'];

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
    try {
        const response = fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        console.log("Response: ", response);
        res.status(200);
    } catch (error) {
        console.log("Error: ", error);
        res.status(400)
    }
}

export default handler;