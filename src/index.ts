import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dupsko from "routes/books.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.HOSTNAME,
        credentials: true,
    })
);

console.log("misery");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", async (_req, res, _next) => {
    res.send({ message: `Server is running in ${process.env.NODE_ENV}` });
});

app.use("/api/v1/books", dupsko);
//app.use('/api/v1/auth', require('./routes/auth.routes'));
//app.use('/api/v1/', require('./routes/contract.routes'));

app.use((_req, _res, next) => {
    next(new createError.NotFound());
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
