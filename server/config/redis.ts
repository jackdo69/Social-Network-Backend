import { RedisOptions } from "ioredis";

export const {
    REDIS_PORT = 6379,
    REDIS_HOST = 'localhost',
    REDIS_EXPIRE = 1000 * 60 * 10 //10 MINS
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
};