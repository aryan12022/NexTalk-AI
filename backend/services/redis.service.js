import Redis from 'ioredis';

const redisClient = new Redis({
    port: process.env.REDIS_PORT ,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;

