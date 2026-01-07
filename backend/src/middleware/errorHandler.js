const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger.error('Request error', {
        message: err.message,
        path: req.path,
        method: req.method
    });

    if (err.response?.status === 401) {
        return res.status(401).json({ error: 'Invalid Reddit credentials' });
    }

    if (err.response?.status === 404) {
        return res.status(404).json({ error: 'Subreddit not found' });
    }

    if (err.message.includes('ECONNABORTED')) {
        return res.status(504).json({ error: 'Request timeout' });
    }

    res.status(500).json({ error: 'Internal server error' });
};
