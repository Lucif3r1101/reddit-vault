const { SORT_METHODS, TIME_FILTERS, MAX_POSTS, MIN_POSTS } = require('../config/constants');

const validateScrapeRequest = (req, res, next) => {
    const { subreddit, sortMethod, limit } = req.body;

    if (!subreddit || typeof subreddit !== 'string' || subreddit.trim() === '') {
        return res.status(400).json({ error: 'Invalid subreddit' });
    }

    if (!SORT_METHODS.includes(sortMethod)) {
        return res.status(400).json({ error: 'Invalid sort method' });
    }

    const numLimit = parseInt(limit) || 50;
    if (numLimit < MIN_POSTS || numLimit > MAX_POSTS) {
        return res.status(400).json({ error: `Limit must be between ${MIN_POSTS} and ${MAX_POSTS}` });
    }

    next();
};

module.exports = {
    validateScrapeRequest
};