const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = "SuperSecretKeyForTheFootballApp";

module.exports = async(req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretKey);
    } catch (err) {
        res.status(400).json({
            error: "Invalid token"
        });
    }
    if (!decodedToken) {
        res.status(400).json({
            error: "Invalid token"
        });
    }
    req.userId = decodedToken.userId;
    req.user = await User.findById(req.userId);
    next();
};