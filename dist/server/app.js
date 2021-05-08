var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Require necessary packages
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import routes from "./routes/index.js"; // All the routes
import { handleError, ErrorHandler } from "./lib/error.js";
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const specs = yield swaggerJsDoc(options);
    //Using middlewares
    const app = express();
    const port = process.env.PORT || 4000;
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    app.use(bodyParser.urlencoded({ extended: true })); //form -data / urlencoded
    app.use(bodyParser.json()); //json data
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
    const __dirname = path.resolve();
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
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
});
startApp();
export { startApp };
//# sourceMappingURL=app.js.map