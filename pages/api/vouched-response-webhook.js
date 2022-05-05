async function handler(req, res) {
    const providerResponse = req?.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const userId = providerResponse?.request?.properties[0]?.name
    const data = {
        "user_id": userId,
        "session_id": providerResponse?.id,
        "response": providerResponse,
        "provider": "vouched",
        "session_response_time": new Date().toISOString(),
    }
    console.log("Vouched Response Webhook Data: ", providerResponse);
    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`
            },
            body: JSON.stringify(data)
        });
        res.status(200).json({msg: "Decision Webhook Success", data: req?.body});
    } catch (error) {
        res.status(400).json({msn: "Decision Webhook Error"})
    }
}

export default handler;