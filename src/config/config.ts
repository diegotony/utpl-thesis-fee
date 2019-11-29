export default {
    MONGO_HOST:process.env.MONGO_HOST || 'localhost',
    MONGO_PORT:process.env.MONGO_PORT || '27017',
    MONGO_DB:process.env.MONGO_DB || 'payment',
    REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',
    PORT: process.env.PORT || '3041',
};

