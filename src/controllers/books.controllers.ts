import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import prisma from 'shared/prisma';
import type { IAddChapterData, IAddBooksData } from 'types/books.types';

// [POST] /api/v1/books
export const addBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, title }: IAddBooksData = req.body.data;
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

// [GET] /api/v1/books
export const findBooks = async (_req: Request, res: Response, next: NextFunction) => {
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

// [POST] /api/v1/books/:id/chapters
export const addChapter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bookId = req.params.id;
		if (!bookId) {
			return next(createHttpError(400, 'No book id'));
		}

		const { id, title, text }: IAddChapterData = req.body.data;
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

// [GET] /api/v1/books/chapters/:id
export const findChapter = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const chapterId = req.params.id;
		if (!chapterId) {
			return next(createHttpError(400, 'No chapter id'));
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
