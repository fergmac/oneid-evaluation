async function handler(req, res) {
    const providerResponse = JSON.parse(req.body);
    try {
        console.log("Jumio Provider Response: ", providerResponse);
    } catch (error) {
        console.log("Jumio Error: ", error);
    }
}

export default handler;