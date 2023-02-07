import express, { Response, Request, Application, NextFunction} from "express";

import cors from "cors";

import morgan from "morgan";

import { AppError, HttpCode } from "./Utils/AppError";

import { ErrorHandler } from "./Middlewares/ErrorHandler/ErrorHandler";

import userrouter from "./Routers/users.routes";

import productrouter from "./Routers/product.routes";

export const AppConfig = (app: Application) =>{
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    // app.use(express.urlencoded());

    // Routes configuration:
    app.use("/api/users", userrouter);
    app.use("/api/products", productrouter)

    app.all("*", (req: Request, res: Response, next: NextFunction) =>{
        next(
            new AppError({
                message: `This route ${req.originalUrl} does not exist`,
                httpCode: HttpCode.NOT_FOUND
            })
        )
    });


    // Errorhandler should be at the bottom of your code
    app.use(ErrorHandler)
}