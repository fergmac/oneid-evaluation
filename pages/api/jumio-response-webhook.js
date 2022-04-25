async function handler(req, res) {
    const providerResponse = req.body
    try {
        console.log("Jumio Provider Response: ", providerResponse);
        res.status(200).json({ msg: 'Jumio Response Webhook.'}); 
    } catch (error) {
        console.log("Jumio Error: ", error);
        res.status(error.status).json({ msg: 'Jumio Response Webhook Error.'}); 
    }
}

export default handler;