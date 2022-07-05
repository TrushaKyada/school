const jwt = require("jsonwebtoken")
const admin = require("../model/admin.model")

const student = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token, "mynameistrushakyadatrusha")
        const user = await admin.findOne({ _id: verifyUser._id })
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}
module.exports = student