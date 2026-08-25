const JWT = require('jsonwebtoken');

const sercret = process.env.JWT_SECRET

function createTokenForuser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }

    const token = JWT.sign(payload, sercret)
    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, sercret)
    return payload;
}

module.exports = {
    createTokenForuser,
    validateToken
}
