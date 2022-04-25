async function handler(req, res) {
    const providerResponse = JSON.parse(req.body)
    const data = {
        "user_id": providerResponse.customerId,
        "session_id": providerResponse.jumioIdScanReference,
        "response": providerResponse,
        "provider": "jumio",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": providerResponse.callbackDate
    }

    try {
        const response = await fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        res.status(response.status).json({msg: "Jumio Response Webhook Success."});
    } catch (error) {
        res.status(error.status).json({msn: "Jumio Response Webhook Error."})
    }
}

export default handler;