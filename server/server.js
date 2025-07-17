const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const { authenticateJWT } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration for frontend connection
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/data', authenticateJWT, dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});