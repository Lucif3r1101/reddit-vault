const logger = require('../../src/utils/logger');

exports.handler = async (event, context) => {
    try {
        logger.info('Health check');

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'ok',
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        logger.error('Health check error', { message: error.message });
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};