//In case this service need to be run on cluster
import cluster from "cluster";
import os from "os";
import { startApp } from "./server/app.js";
const numCPUs = os.cpus().length;
const input = process.argv[2] || 0;
let numWorkers;
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
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    startApp();
    console.log(`Worker ${process.pid} started`);
    cluster.on('message', () => {
        console.log(`New message on ${process.pid}`);
    });
}
//# sourceMappingURL=server.js.map