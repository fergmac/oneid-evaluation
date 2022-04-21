async function handler(req, res) {
    const providerResponse = req.body;
    try {
        console.log("Provider Response: ", providerResponse);
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default handler;