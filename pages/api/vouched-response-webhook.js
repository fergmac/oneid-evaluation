async function handler(req, res) {
    const providerResponse = req.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.request?.properties[0]?.name,
        "session_id": providerResponse?.id,
        "response": providerResponse,
        "provider": "vouched",
        "session_response_time": new Date().toISOString(),
    }
    console.log("Vouched Response Webhook Data: ", data);
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