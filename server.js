//In case this service need to be run on cluster
import cluster from "cluster";
import http from "http";
import os from "os";
import app from "./server/app.js";

const numCPUs = os.cpus().length;
const port = process.env.PORT || 4000;
const input = process.argv[2] || 0
let numWorkers
input === 0 ? numWorkers = numCPUs : numWorkers = input;



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
  const server = http.createServer(app);
  server.listen(port);
  console.log(`Worker ${process.pid} started`);
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  });

  cluster.on('message', () => {
    console.log(`New message on ${process.pid}`);
  })
}


