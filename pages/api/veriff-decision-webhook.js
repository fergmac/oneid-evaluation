async function handler(req, res) {
    const providerResponse = req.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.verification?.vendorData,
        "session_id": providerResponse?.verification?.id,
        "response": providerResponse,
        "provider": "veriff",
        "session_response_time": new Date().toISOString()
    }

    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Decision Webhook Success"});
    } catch (error) {
        console.error("Error: ", error?.status)
        res.status(error?.status).json({ msg: "Decision Webhook Error" });
    }
}

export default handler;
