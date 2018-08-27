const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.header('X-Auth');

    if(!token) return res.status(401).json({ message: "Token Not Found" });

    try {
        let decoded = jwt.verify(token, 'jwtPrivateKey')
        req.user = decoded;

        next();
    } catch(ex) {
        res.status(401).json({ message: "Token Not Valid" });
    }
}
