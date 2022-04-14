export default function handler(req, res) {
    console.log("Identity Verification: ", req.body)
    // res.status(200).json({ msg: 'Identity Verification Data Submitted' })

    // TODO:
    // 1. Parse provider responses
    // 2. forward identity verification data to aws api gateway endpoint
}