import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL, {
  tls: {} // required for rediss:// (secure connection)
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

export default redisClient;
