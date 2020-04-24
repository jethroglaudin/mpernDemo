const jwt = require("jsonwebtoken");
const secretKey = require("../config/default").secretOrKey;


module.exports = (req, res, next) => {
    // get token from header
    const token = req.header("x-auth-token");
    
    if(!token) {
        return res.status(401).json({errors: {msg: "No token, authorization denied"}});
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // aid, username
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ errors: { msg: "Token is not valid" } });
    }
}