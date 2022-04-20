// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    console.log("Event Webhook - Provider Data: ", req.body);
    console.log("Event Type: ", req.body.action);

    const provider_data = req.body
    let data;
    let httpMethod;
    // let timeStamp = new Date();
    // timeStamp = timeStamp.toUTCString().split(" ")['4'];

    if (provider_data.action === 'started') {
        data = {
            "user_id": provider_data.vendorData,
            "session_id": provider_data.id,
            "response": "",
            "provider": "",
            "start_time": "test-start-time",
            "stop_time": ""
        }
        httpMethod = "POST";
    }

    if (provider_data.action === 'submitted') {
        data = {
            "user_id": provider_data.vendorData,
            "session_id": provider_data.id,
            "response": "",
            "provider": "",
            "start_time": "",
            "stop_time": "test-stop-time"
        }
        httpMethod = "PATCH";
    }

    try {
        const response = await fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        console.log("Response: ", response.status);
        res.status(200).json({msg: "Event Webhook Success",});
    } catch (error) {
        console.log("Error: ", error);
        res.status(400).json({msn: "Event Webhook Error"})
    }
}

export default handler;