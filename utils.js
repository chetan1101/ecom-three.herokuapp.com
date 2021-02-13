const jwt = require('jsonwebtoken');

module.exports = {
    getToken: (user) => {
        return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        )
    },
    
    isAuth: (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.slice(7, authorization.length);
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    res.status(401).send({ massage: "Invalid token" })
                } else {
                    req.user = decode;
                    next();
                }
            })
        } else {
            res.status(401).send({ massage: 'Token not found.' })
        }
    }

}