module.exports = {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 5000,

    reddit: {
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD,
        userAgent: process.env.REDDIT_USER_AGENT || 'RedditVault/2.0'
    },

    rateLimit: {
        window: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000,
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5
    },

    cache: {
        ttl: parseInt(process.env.CACHE_TTL) || 300
    },

    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:3000'
    }
};