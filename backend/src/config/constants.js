const REDDIT_AUTH_URL = 'https://www.reddit.com/api/v1/access_token';
const REDDIT_API_URL = 'https://oauth.reddit.com';

const SORT_METHODS = ['hot', 'top', 'new', 'rising', 'controversial'];
const TIME_FILTERS = ['all', 'year', 'month', 'week', 'day'];

const MAX_POSTS = 100;
const MIN_POSTS = 1;

const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid Reddit credentials',
    INVALID_SUBREDDIT: 'Invalid subreddit name',
    REDDIT_API_ERROR: 'Reddit API error',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Try again later.',
    INTERNAL_ERROR: 'Internal server error'
};

module.exports = {
    REDDIT_AUTH_URL,
    REDDIT_API_URL,
    SORT_METHODS,
    TIME_FILTERS,
    MAX_POSTS,
    MIN_POSTS,
    ERROR_MESSAGES
};