import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "shared/prisma";

export const addBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id, title }: { id: string | undefined; title: string } =
            req.body.data;
        const insertedBook = await prisma.book.upsert({
            where: {
                id,
            },
            update: {
                title,
            },
            create: {
                title,
            },
        });

        res.send(insertedBook);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get /books
// post /books
// post /books/:id/chapters
// get /books/chapters/:id

export const findBooks = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                chapters: true,
            },
        });
        res.send(books);
    } catch (error) {
        next(error);
    }
};

export const addChapter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return next(createHttpError(400, "No book id"));
        }

        const { id, title, text }: { id: string; title: string; text: string } =
            req.body.data;
        const insertedChapter = await prisma.chapter.upsert({
            where: {
                id,
            },
            update: {
                title,
                text,
            },
            create: {
                title,
                text,
                bookId,
            },
        });
        res.send(insertedChapter);
    } catch (error) {
        next(error);
    }
};

export const findChapter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const chapterId = req.params.id;
        if (!chapterId) {
            return next(createHttpError(400, "No chapter id"));
        }

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
            },
        });
        res.send(chapter);
    } catch (error) {
        next(error);
    }
};
