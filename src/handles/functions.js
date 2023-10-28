const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({message: 'Unathorize request'})
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).json({message: 'Unathorize request'})
    }

    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id
    next()
}