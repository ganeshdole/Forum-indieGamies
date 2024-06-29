const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const protectedRoutes = ['/threads/thread/new', '/replies/new']
        if (!protectedRoutes.includes(req.url)) {
            console.log("No Auth Required")
            return next()
        }
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({
                message: 'Token Missing',
            })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRETE);
        if (!payload) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }
        req.user = payload
        next()
    } catch (error) {
        console.log("Authentication Fail", error.message)
        return res.status(500).json({
            message: "Authentication Fail",
            error: error.message
        })
    }
}

module.exports = authMiddleware;