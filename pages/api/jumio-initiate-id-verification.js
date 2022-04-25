async function handler(req, res) {
    const userName = process.env.JUMIO_API_TOKEN;
    const password = process.env.JUMIO_API_SECRET;
    const userData = JSON.parse(req.body);

    const credentials = new Buffer(`${userName}:${password}`).toString('base64');

    console.log("Jumio Init User Data: ", userData);

    // TODO: add customer internal reference
    try {
        const response = await fetch("https://netverify.com/api/v4/initiate", {
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
        console.log("Jumio Init Data: ", data);
        res.status(200).json({ msg: 'Jumio Initiate ID Verification.', data: data}); 
    } catch (error) {
        console.log("Jumio Init Error: ", error);
        res.status(400).json({ msg: "Jumio Initiate ID Verification Error: "});
    }
}

export default handler;