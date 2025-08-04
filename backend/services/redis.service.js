import Redis from 'ioredis';

// Use the full Upstash URL from environment variables
const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('connect', () => {
    console.log('Redis connected');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redisClient;
