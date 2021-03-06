// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
async function handler(req, res) {
    const url = process.env.API_ONE_ID_RESPONSE_URL
    const apiKey = process.env.API_KEY

    const providerResponse = req.body
    let data;
    let httpMethod;

    if (providerResponse.action === 'started') {
        data = {
            "user_id": providerResponse?.vendorData,
            "session_id": providerResponse?.id,
            "provider": "veriff",
            "session_start_time": new Date().toISOString(),
        }
        httpMethod = "POST";
    }

    if (providerResponse.action === 'submitted') {
        data = {
            "user_id": providerResponse?.vendorData,
            "session_id": providerResponse?.id,
            "provider": "veriff",
            "session_end_time": new Date().toISOString(),
        }
        httpMethod = "PATCH";
    }

    try {
        const response = await fetch(`${url}`, {
            method: httpMethod,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${apiKey}`,
            },
            body: JSON.stringify(data)
        });
        res.status(response?.status).json({msg: "Event Webhook Success"});
    } catch (error) {
        res.status(error?.status).json({ msg: "Event Webhook Error" });
    }
}

export default handler;