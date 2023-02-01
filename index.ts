import express, { Application } from "express";

import dotenv from "dotenv";

dotenv.config();

import { env } from "process";

const port = env.PORT as string;

const app: Application = express();

app.listen();