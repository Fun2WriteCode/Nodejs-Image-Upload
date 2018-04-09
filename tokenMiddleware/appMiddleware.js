const jwt = require('jsonwebtoken');
const secretKeys = require('../tokenMiddleware/secretKeys');

function authenticateToken(req, res, next) {
    // check if originalUrl is for signup or sign in then let it go
    // console.log(req.originalUrl);
    if (
        req.originalUrl == '/User/register'
        || req.originalUrl == '/User/login'
        || req.originalUrl.includes('/api/user/getWalletAddress/') 
        || req.originalUrl.includes('/socket.io/')
        || req.originalUrl.includes('/files/image')
        || req.originalUrl.includes('/public/uploads')
        ) {
        return next();
    }
    // console.log('originalUrl: ', req.originalUrl) 
    // console.log('base url: ', req.baseUrl);
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], secretKeys.jwtSecret, (err, decoded) => {
            if (err) {
                console.log('Unauthorized. Token token not valid');
                return res.status(401).json({
                    code: 401,
                    message: 'You are unauthorized to view this resource.'
                });
            } else {
                req.userAuth = decoded;
                console.log('User authorized.');
                next();
            }
        });
    } else {
        console.log('Unauthorized. JWT Token not found.');
        return res.status(401).json({
            code: 401,
            message: statusMessages.unauthorized
        });
    }
} // authenticateToken

module.exports = {
    authenticateToken
};