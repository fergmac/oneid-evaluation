// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    console.log("Event Webhook - Provider Data: ", req.body);
    console.log("Event Type: ", req.body?.action);
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY

    const providerResponse = req.body
    let data;
    let httpMethod;

    if (providerResponse.action === 'started') {
        data = {
            "user_id": providerResponse.vendorData,
            "session_id": providerResponse.id,
            "response": "",
            "provider": "veriff",
            "session_start_time": "test-start-time",
            "session_end_time": "",
            "session_response_time": ""
        }
        httpMethod = "POST";
    }

    if (providerResponse.action === 'submitted') {
        data = {
            "user_id": providerResponse?.vendorData,
            "session_id": providerResponse?.id,
            "response": "",
            "provider": "veriff",
            "session_start_time": "",
            "session_end_time": "test-stop-time",
            "session_response_time": ""
        }
        httpMethod = "PATCH";
    }

    console.log("Data: ", data)

    try {
        const response = await fetch(`${url}`, {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(200).json({msg: "Event Webhook Success"});
    } catch (error) {
        res.status(400).json({msn: "Event Webhook Error"})
    }
}

export default handler;