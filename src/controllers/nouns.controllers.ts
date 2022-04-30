import type { Request, Response, NextFunction } from "express";
import prisma from "shared/prisma";
import type { Prisma } from "@prisma/client";

export const addNoun = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const noun: Prisma.NounCreateInput = req.body.data;
        const insertedNoun = await prisma.noun.create({
            data: noun,
        });

        res.send(insertedNoun);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
