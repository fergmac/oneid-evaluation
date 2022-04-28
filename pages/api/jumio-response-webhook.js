async function handler(req, res) {
    const providerResponse = req.body
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    console.log("Provider Response: ", providerResponse);
    const data = {
        "user_id": providerResponse?.customerId,
        "session_id": providerResponse?.jumioIdScanReference,
        "response": providerResponse,
        "provider": "jumio",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": providerResponse?.callbackDate
    }

    try {
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Jumio Response Webhook Success."});
    } catch (error) {
        res.status(error?.status).json({msn: "Jumio Response Webhook Error."})
    }
}

export default handler;