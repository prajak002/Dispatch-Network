const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with your actual secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

// Middleware for role-based access control
const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.Admin) or an array of roles (e.g. [Role.Admin, Role.Editor])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (req.user && roles.length && !roles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};

// Alias for backward compatibility
const authenticateJWT = verifyToken;

module.exports = {
    verifyToken,
    authenticate: verifyToken,
    authenticateJWT,
    authorize,
};