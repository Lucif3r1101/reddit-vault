const NodeCache = require('node-cache');
const logger = require('../utils/logger');

const ipCache = new NodeCache({ stdTTL: 60 });

module.exports = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const limit = 5;

    const current = (ipCache.get(ip) || 0) + 1;

    if (current > limit) {
        logger.warn('Rate limit exceeded', { ip });
        return res.status(429).json({ error: 'Too many requests. Try again later.' });
    }

    ipCache.set(ip, current);
    next();
};