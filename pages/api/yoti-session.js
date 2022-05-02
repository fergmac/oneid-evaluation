async function handler(req, res) {
  let baseUrl = new URL(process.env.API_ONE_ID_RESPONSE_URL)
  const userData = JSON.parse(req.body);
  const userId = userData?.userId || 'default-yoti-user'
  console.log("Starting the session for user: " + userId)

  baseUrl.searchParams.append("user_id", userId);

  try {
      const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.API_KEY,
          },
      });
      const sessionDetails = await response.json();
      console.log(sessionDetails)

    res.status(response?.status).json({
      msg: "Yoti Session Response Webhook Success",
      sessionId: sessionDetails?.session_id,
      clientSessionToken: sessionDetails?.client_session_token,
      status: response?.status
    });
  } catch (error) {
      console.log(error)
    res.status(response?.status).json(
      {
        msg: error
      })
  }
}

export default handler;
