import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import createHttpError from "http-errors";

const roles = {
    admin: "ADMIN",
    user: "USER",
};

export const admin = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers["authorization"];

        if (!authorization) {
            return next(createHttpError(401, "No token provided"));
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return next(createHttpError(401, "Token is not valid"));
        }

        const payload: any = verify(
            token,
            process.env.JWT_ACCESS_TOKEN_SECRET!
        );

        if (payload.role !== roles.admin) {
            return next(createHttpError(403));
        }

        req.payload = payload;
        next();
    } catch (error) {
        next(createHttpError(401, "Token is not valid"));
    }
};

export const user = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers["authorization"];

        if (!authorization) {
            return next(createHttpError(401, "No token provided"));
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return next(createHttpError(401, "Token is not valid"));
        }

        const payload: any = verify(
            token,
            process.env.JWT_ACCESS_TOKEN_SECRET!
        );

        req.payload = payload;
        next();
    } catch (error) {
        next(createHttpError(401, "Token is not valid"));
    }
};
