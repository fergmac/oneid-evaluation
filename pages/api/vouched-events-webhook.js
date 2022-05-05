async function handler(req, res) {
    const providerResponse = JSON.parse(req.body);
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.userId,
        "session_id": providerResponse?.sessionId,
        "response": "",
        "provider": "vouched",
        "session_start_time": providerResponse?.sessionStartTime,
        "session_end_time": providerResponse?.sessionEndTime,
        "session_response_time": providerResponse?.sessionResponseTime
    }
    let httpMethod;

    if (providerResponse?.sessionStartTime) {
        httpMethod = "POST"
    } 

    if (providerResponse?.sessionEndTime) {
        httpMethod = "PATCH"
    }

    console.log("Vouched Events Webhook - Data: ", data)
    console.log("Vouched Events Webhook - httpMethod: ", httpMethod)

    try {
        const response = await fetch(`${url}`, {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Event Webhook Success"});
    } catch (error) {
        res.status(error?.status).json({msn: "Event Webhook Error"})
    }
}

export default handler;