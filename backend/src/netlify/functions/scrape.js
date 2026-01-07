const { fetchPosts } = require('../../src/utils/reddit');
const { validateScrapeRequest } = require('../../src/utils/validation');
const logger = require('../../src/utils/logger');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { subreddit, sortMethod, timeFilter, limit } = body;

        // Validate
        if (!subreddit || typeof subreddit !== 'string' || subreddit.trim() === '') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid subreddit' })
            };
        }

        if (!['hot', 'top', 'new', 'rising'].includes(sortMethod)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid sort method' })
            };
        }

        logger.info('Scraping request', { subreddit, sortMethod, limit });

        const posts = await fetchPosts(
            subreddit.replace(/^r\//, '').trim(),
            sortMethod,
            timeFilter || 'all',
            parseInt(limit) || 50
        );

        logger.info('Scrape successful', { subreddit, count: posts.length });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                posts,
                count: posts.length,
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        logger.error('Scrape error', { message: error.message });

        if (error.response?.status === 401) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid Reddit credentials' })
            };
        }

        if (error.response?.status === 404) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Subreddit not found' })
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};