async function handler(req, res) {
    const providerResponse = JSON.parse(req.body);
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    let data;

    let httpMethod;

    if (providerResponse?.action === "onInit") {
        httpMethod = "POST"
        data = {
            "user_id": providerResponse?.userId,
            "session_id": providerResponse?.sessionId,
            "provider": "vouched",
            "session_start_time": providerResponse?.timeStamp,
        }
    } 

    if (providerResponse?.action === "onDone") {
        httpMethod = "PATCH"
        data = {
            "user_id": providerResponse?.userId,
            "session_id": providerResponse?.sessionId,
            "provider": "vouched",
            "session_end_time": providerResponse?.timeStamp,
        }
    }

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
        res.status(error?.status).json({ msg: "Event Webhook Error" });
    }
}

export default handler;