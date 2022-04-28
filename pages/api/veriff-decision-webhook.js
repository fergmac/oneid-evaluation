async function handler(req, res) {
    const providerResponse = req.body;
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const data = {
        "user_id": providerResponse?.verification?.vendorData,
        "session_id": providerResponse?.verification?.id,
        "response": providerResponse,
        "provider": "veriff",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": ""
    }

    console.log("Data: ", data)
    
    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Decision Webhook Success"});
    } catch (error) {
        res.status(error?.status).json({msn: "Decision Webhook Error"})
    }
}

export default handler;