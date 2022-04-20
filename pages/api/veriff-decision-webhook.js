async function handler(req, res) {
    const providerResponse = req.body;
    const data = {
        "user_id": providerResponse.verification.vendorData,
        "session_id": providerResponse.verification.id,
        "response": providerResponse,
        "provider": "",
        "start_time": "",
        "stop_time": ""
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