const JWT = require('jsonwebtoken');
const User = require("../modals/user")
const auth = async (req, res, next) => {
    try {
        console.log("------------------------------------------------------------------")
        const token = req.header("Authorization").split(" ")[1]
        console.log(token)
        const decodeToken = JWT.verify(token, "deepak")
        console.log("decode token", decodeToken)
        if (decodeToken) {
            await User.findByPk(decodeToken.userId).then((user) => {
                req.user = user,
                    next()
            })
        }

    } catch (err) {
        return res.status(401).json(err)
    }
}
module.exports = auth;