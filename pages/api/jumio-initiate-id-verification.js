async function handler(req, res) {
    const userName = process.env.JUMIO_API_TOKEN;
    const password = process.env.JUMIO_API_SECRET;
    const userData = JSON.parse(req.body);

    const credentials = new Buffer(`${userName}:${password}`).toString('base64');

    // TODO: add customer internal reference
    try {
        const response = await fetch(process.env.JUMIO_INITIATE_TRANSACTION_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Content-Length": "",
                "Authorization": `Basic ${credentials}`,
                "User-Agent": "Certn TestApp/v1.0"

            },
            body: JSON.stringify({
                "customerInternalReference": "test-customer-internal-reference",
                "userReference": userData?.userId,
            })
        })
        const data = await response.json()
        res.status(response?.status).json({ msg: 'Jumio Initiate ID Verification.', data: data}); 
    } catch (error) {
        res.status(error?.status).json({ msg: "Jumio Initiate ID Verification Error: "});
    }
}

export default handler;