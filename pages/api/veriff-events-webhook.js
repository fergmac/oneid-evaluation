// import Cors from 'cors'

// const cors = Cors({
//     methods: ['POST', 'HEAD'],
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//     }
// })

// function runMiddleware(req, res, fn) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result) => {
//         if (result instanceof Error) {
//             return reject(result)
//         }

//         return resolve(result)
//         })
//     })
// }

// TODO: should check webhook comes from Veriff: https://developers.veriff.com/#address-media-mediaid
export default function handler(req, res) {
    // await runMiddleware(req, res, cors)

    console.log("Veriff Events Webhook: ", req.body)
    // res.status(200).json({ msg: 'Identity Verification Data Submitted' })

    // TODO:
    // 1. Parse provider responses
    // 2. forward identity verification data to aws api gateway endpoint
}

// export default handler;