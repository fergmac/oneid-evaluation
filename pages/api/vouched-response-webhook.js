async function handler(req, res) {
    const providerResponse = req.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.properties[0]?.userId,
        "session_id": providerResponse?.id,
        "response": providerResponse,
        "provider": "vouched",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": new Date().getTime(),
    }
    
    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Decision Webhook Success"});
    } catch (error) {
        res.status(error?.status).json({msn: "Decision Webhook Error"})
    }
}

export default handler;