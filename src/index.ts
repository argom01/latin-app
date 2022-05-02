import express from "express";
import type { Express, Request, Response } from "express";
import createError from "http-errors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import booksRouter from "routes/books.routes";
import nounsRouter from "routes/nouns.routes";
import authRouter from "routes/auth.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.HOSTNAME,
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.get("/", async (_req, res, _next) => {
    res.send(`Server is running in ${process.env.NODE_ENV}`);
});

app.use("/api/v1/", booksRouter);
app.use("/api/v1/", nounsRouter);
app.use("/api/v1/auth", authRouter);

app.use((_req, _res, next) => {
    next(new createError.NotFound());
});

app.use((err: any, _req: Request, res: Response) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
