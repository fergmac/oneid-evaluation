async function handler(req, res) {
    const providerResponse = req.body;

    console.log("Vouched Webhook Response: ", providerResponse);
    
    const data = {
        "user_id": providerResponse?.properties[0].userId,
        "session_id": providerResponse?.id,
        "response": providerResponse,
        "provider": "vouched",
        "session_start_time": "",
        "session_end_time": "",
        "session_response_time": "test-session-response-time",
    }
    
    try {
        const response = await fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: JSON.stringify(data)
        });
        res.status(response.status).json({msg: "Decision Webhook Success"});
    } catch (error) {
        res.status(error.status).json({msn: "Decision Webhook Error"})
    }
}

export default handler;