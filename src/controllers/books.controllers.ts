import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "shared/prisma";
import type { TAddChapterData, TAddBookData } from "types/books.types";

// [POST] /api/v1/books
export const addBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id, title }: TAddBookData = req.body.data;
        const insertedBook = await prisma.book.upsert({
            where: {
                id: id || "",
            },
            update: {
                title,
            },
            create: {
                title,
                ownerId: req.payload.userId,
            },
            select: {
                id: true,
                title: true,
            },
        });

        res.send(insertedBook);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// [GET] /api/v1/books
export const findBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const books = await prisma.book.findMany({
            where: {
                ownerId: req.payload.userId,
            },
            include: {
                chapters: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        res.send(books);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /api/v1/books/:id
export const deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return next(createHttpError(400, "No book id"));
        }

        await prisma.book.delete({
            where: {
                id: bookId,
            },
        });

        res.send("Book deleted successfully");
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/books/:id/chapters
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

        if (
            !(await prisma.book.findUnique({
                where: {
                    id: bookId,
                },
            }))
        ) {
            return next(createHttpError(400, "Wrong book id"));
        }

        const { id, title, text }: TAddChapterData = req.body.data;
        const insertedChapter = await prisma.chapter.upsert({
            where: {
                id: id || "",
            },
            update: {
                title,
                text,
            },
            create: {
                title,
                text: text || "",
                bookId,
            },
        });
        res.send(insertedChapter);
    } catch (error) {
        next(error);
    }
};

// [DELETE] /api/v1/books/chapters/:id
export const deleteChapter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const chapterId = req.params.id;
        if (!chapterId) {
            return next(createHttpError(400, "No chapter id"));
        }

        await prisma.chapter.delete({
            where: {
                id: chapterId,
            },
        });
        res.send("Chapter deleted successfully");
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/books/chapters/:id
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
