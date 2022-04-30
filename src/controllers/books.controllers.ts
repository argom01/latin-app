import type { NextFunction, Request, Response } from 'express';
import prisma from 'shared/prisma';

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title }: { title: string } = req.body.data;
		const insertedBook = await prisma.book.create({
			data: {
				title,
			},
		});

		res.send(insertedBook);
	} catch (error) {
		console.log(error);
		next(error);
	}
};
