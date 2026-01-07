const axios = require('axios');
const { REDDIT_AUTH_URL, REDDIT_API_URL } = require('../config/constants');
const env = require('../config/environment');
const logger = require('./logger');

const getAccessToken = async () => {
    try {
        const auth = Buffer.from(
            `${env.reddit.clientId}:${env.reddit.clientSecret}`
        ).toString('base64');

        const response = await axios.post(
            REDDIT_AUTH_URL,
            `grant_type=password&username=${env.reddit.username}&password=${env.reddit.password}`,
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'User-Agent': env.reddit.userAgent
                },
                timeout: 10000
            }
        );

        return response.data.access_token;
    } catch (error) {
        logger.error('Failed to get Reddit token', { message: error.message });
        throw new Error('Failed to authenticate with Reddit');
    }
};

const fetchPosts = async (subreddit, sortMethod, timeFilter, limit) => {
    try {
        const token = await getAccessToken();

        const params = {
            limit: Math.min(limit, 100),
            t: sortMethod === 'top' ? timeFilter : undefined
        };

        const response = await axios.get(
            `${REDDIT_API_URL}/r/${subreddit}/${sortMethod}`,
            {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': env.reddit.userAgent
                },
                timeout: 15000
            }
        );

        return response.data.data.children.map((child, idx) => {
            const post = child.data;
            return {
                Rank: idx + 1,
                Title: post.title,
                'Flair/Tag': post.link_flair_text || 'No Flair',
                Author: post.author || '[deleted]',
                Score: post.score,
                Comments: post.num_comments,
                Created: new Date(post.created_utc * 1000).toLocaleString(),
                URL: `https://reddit.com${post.permalink}`,
                'Post ID': post.id
            };
        });
    } catch (error) {
        logger.error('Failed to fetch posts', { message: error.message });
        throw error;
    }
};

module.exports = {
    getAccessToken,
    fetchPosts
};
