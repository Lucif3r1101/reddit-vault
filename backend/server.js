const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const scrapingController = require('./src/controllers/scrapingController');
const errorHandler = require('./src/middleware/errorHandler');
const securityMiddleware = require('./src/middleware/security');
const logger = require('./src/utils/logger');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.FRONTEND_URL || '*'
    ].filter(Boolean),
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(securityMiddleware);

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/scrape', scrapingController.scrapeReddit);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;