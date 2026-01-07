const { fetchPosts } = require('../utils/reddit');
const { validateScrapeRequest } = require('../utils/validation');
const logger = require('../utils/logger');

const scrapeReddit = async (req, res, next) => {
    try {
        validateScrapeRequest(req, res, () => { });

        const { subreddit, sortMethod, timeFilter, limit } = req.body;

        logger.info('Scraping request', { subreddit, sortMethod, limit });

        const posts = await fetchPosts(
            subreddit.replace(/^r\//, '').trim(),
            sortMethod,
            timeFilter || 'all',
            parseInt(limit) || 50
        );

        logger.info('Scrape successful', { subreddit, count: posts.length });

        res.json({
            success: true,
            posts,
            count: posts.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    scrapeReddit
};