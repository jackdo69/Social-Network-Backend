//In case this service need to be run on cluster
import cluster from "cluster";
import http from "http";
import os from "os";
import { createApp } from "./server/app";

import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { REDIS_OPTIONS, APP_PORT } from './server/config';

const numCPUs = os.cpus().length;
const input = process.argv[2] || 0;
let numWorkers;
input === 0 ? numWorkers = numCPUs : numWorkers = input;

(async () => {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const RedisStore = connectRedis(session);

    const client = new Redis(REDIS_OPTIONS);

    const store = new RedisStore({ client });
    await createApp(store);
    console.log(`Worker ${process.pid} started`);

    cluster.on('message', () => {
      console.log(`New message on ${process.pid}`);
    });
  }

})();



