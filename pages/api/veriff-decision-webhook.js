async function handler(req, res) {
    console.log("Decision Webhook Body: ", req.body)
    try {
        const response = await fetch("https://dcwsy6m8yg.execute-api.ca-central-1.amazonaws.com/default/one_id_testing_responses", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY,
            },
            body: req.body
        });
        res.status(response.status).json({msg: "Decision Webhook Success"});
    } catch (error) {
        res.status(error.status).json({msn: "Decision Webhook Error"})
    }
}

export default handler;