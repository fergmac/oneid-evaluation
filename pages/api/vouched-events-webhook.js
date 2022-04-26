async function handler(req, res) {
    const providerResponse = JSON.parse(req.body);
    const data = {
        "user_id": providerResponse?.userId,
        "session_id": providerResponse?.sessionId,
        "response": "",
        "provider": "vouched",
        "session_start_time": providerResponse?.sessionStartTime,
        "session_end_time": providerResponse?.sessionEndTime,
        "session_response_time": providerResponse?.sessionResponseTime
    }

    try {
        const response = await fetch(process.env.API_ONE_ID_RESPONSE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Event Webhook Success"});
    } catch (error) {
        res.status(error?.status).json({msn: "Event Webhook Error"})
    }
}

export default handler;