async function handler(req, res) {
    console.table(req.body)
    const providerResponse = req.body && JSON.parse(req.body);
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY
    const data = {
        "user_id": providerResponse?.userId,
        "session_id": providerResponse?.sessionId,
        "response": "",
        "provider": "yoti",
        "session_response_time": providerResponse?.sessionResponseTime,
        ...(providerResponse.hasOwnProperty("sessionStartTime") && {
            session_start_time: providerResponse.sessionStartTime
        }),
        ...(providerResponse.hasOwnProperty("sessionEndTime") && {
            session_end_time: providerResponse.sessionEndTime
        }),
    }

    console.table(data)
    console.log(JSON.stringify(data))
    console.log("Dynamodb to be updated for session: ", data.session_id)

    try {
        const response = await fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({
            msg: "Event Webhook Success",
            response: response
        });
    } catch (error) {
        res.status(error?.status).json({
            msg: "Event Webhook Error"
        })
    }
}

export default handler;
