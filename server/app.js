//Require necessary packages
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js"; // All the routes
import { handleError, ErrorHandler } from "./lib/error.js";

//Using middlewares
const app = express();
import swaggerDocument from "../swagger.js";
app.use(bodyParser.urlencoded({ extended: true })); //form -data / urlencoded
app.use(bodyParser.json()); //json data
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//This endpoint just for testing the Nodejs Cluster implementation
app.get("/getFibonacci", (req, res, next) => {
  function fibonacci(n) {
    if (n === 0 || n === 1) return n;
    else return fibonacci(n - 1) + fibonacci(n - 2);
  }

  const input = req.body.input;
  const value = fibonacci(input);
  res.status(200).json({ result: value });
});

//Unknow route
app.use((req, res, next) => {
  const error = new ErrorHandler(404, "Page not found!");
  next(error);
});

//Handling errors
app.use((err, req, res, next) => {
  handleError(err, res);
});

export default app;
