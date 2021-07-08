import { RedisOptions } from 'ioredis';

export const {
  REDIS_PORT = 6379,
  REDIS_HOST = 'localhost',
  REDIS_EXPIRE = 60 * 60 * 24, //1 day
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
  port: +REDIS_PORT,
  host: REDIS_HOST,
};
