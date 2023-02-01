import express, { Response, Request, Application} from "express";

import cors from "cors";

import morgan from "morgan";

export const AppConfig = (app: Application) =>{
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.urlencoded())
}