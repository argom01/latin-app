import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const prismaErrorHandler = (
    err: any,
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return next(
                    createHttpError(400, "Unique constraint violation")
                );
            case "P2015":
                return next(createHttpError(404, "Record does not exist"));
            default:
                return next(createHttpError(500, "Internal database error"));
        }
    } else {
        next(err);
    }
};
