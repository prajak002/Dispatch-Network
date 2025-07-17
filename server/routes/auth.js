const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
    { email: "admin@site.com", password: "admin123", role: "admin" },
    { email: "editor@site.com", password: "editor123", role: "editor" },
    { email: "viewer@site.com", password: "viewer123", role: "viewer" }
];

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign(
            { userId: user.email, role: user.role, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + (10 * 60) },
            SECRET_KEY
        );
        return res.json({ token });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
        res.json({ userId: decoded.userId, role: decoded.role });
    });
});

module.exports = router;