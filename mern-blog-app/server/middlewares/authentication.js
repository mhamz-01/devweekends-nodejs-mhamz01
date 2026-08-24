const { validateToken } = require('../services/authentication')

function checkForAuthenticationCookie(cookieName) {
    return function (req, res, next) {
        const token = req.cookies?.[cookieName]
        req.user = null

        if (token) {
            try {
                req.user = validateToken(token)
            } catch (err) {
                req.user = null
            }
        }

        next()
    }
}

module.exports = { checkForAuthenticationCookie }
