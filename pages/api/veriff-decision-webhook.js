async function handler(req, res) {
    const providerResponse = req.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.verification?.vendorData,
        "session_id": providerResponse?.verification?.id,
        "response": providerResponse,
        "provider": "veriff",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": new Date().getTime()
    }

    console.log("Data: ", data)

    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(200).json({msg: "Decision Webhook Success"});
    } catch (error) {
        console.log("Error: ", error?.status)
        res.status(400).json({msn: "Decision Webhook Error"})
    }
}

export default handler;
