//Require necessary packages
import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes"; // All the routes
import { handleError, CustomError } from "./services/error-service";

export const createApp = async () => {

  const app = express();

  const __dirname = path.resolve();

  app.use(express.urlencoded({ extended: true })); //form -data / urlencoded

  app.use(express.json()); //json data

  app.use(helmet());

  app.use(cors());

  app.use(morgan("dev"));

  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", routes);


  //Unknow route
  app.use((req, res, next) => {
    next(new CustomError(404, "Page not found!"));
  });

  //Handling errors
  app.use((err, req, res, next) => {
    handleError(err, res);
  });

  return app;
};




