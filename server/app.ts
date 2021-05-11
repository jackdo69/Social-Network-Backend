//Require necessary packages
import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import routes from "./routes/index.js"; // All the routes
import { handleError, ErrorHandler } from "./lib/error.js";
import session, {Store} from 'express-session'

export const createApp = async (store : Store) => {

  //Swagger setup
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "Social Network API",
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
    },
    apis: ["./server/routes/*.js"],
  };

  const specs = await swaggerJsDoc(options);

  //Using middlewares
  const app = express();
  const __dirname = path.resolve();
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  
  app.use(express.urlencoded({ extended: true })); //form -data / urlencoded
  
  app.use(express.json()); //json data
  
  app.use(helmet());
  
  app.use(cors());
  
  app.use(morgan("dev"));

  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", routes);


  //Unknow route
  app.use((req, res, next) => {
    const error = new ErrorHandler(404, "Page not found!");
    next(error);
  });

  //Handling errors
  app.use((err, req, res, next) => {
    handleError(err, res);
  });

  return app;
};




