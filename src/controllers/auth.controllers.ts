import type { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { createAccessToken, createRefreshToken } from '../shared/auth';
import sendRefreshToken from '../shared/sendRefreshToken';
import prisma from '../shared/prisma';

// post /api/v1/auth/register
export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, email, password, role } = req.body.data;
		const hashedPassword = await hash(password, 12);

		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				role,
			},
		});

		res.send('User created successfully');
	} catch (error) {
		console.log(error);
		next(error);
	}
};

// post /api/v1/auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body.data;

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return next(createHttpError(404, 'User not found'));
		}

		const valid = await compare(password, user.password);

		if (!valid) {
			return next(createHttpError(401, 'Bad password'));
		}

		sendRefreshToken(res, createRefreshToken(user));
		res.send(createAccessToken(user));
	} catch (error) {
		next(error);
	}
};

// post /api/v1/auth/logout
export const logout = async (_req, res: Response, next: NextFunction) => {
	try {
		sendRefreshToken(res, '');
		res.send({ ok: true, accessToken: '' });
	} catch (error) {
		next(error);
	}
};

// delete /api/v1/auth/users/:id
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;

		if (!id) {
			return next(createHttpError(400, 'No user id provided'));
		}

		await prisma.user.delete({
			where: { id },
		});

		res.send('User deleted successfully');
	} catch (error) {
		next(error);
	}
};

// get /api/v1/auth/users
export const users = async (_req, res: Response, next: NextFunction) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		});
		res.send(users);
	} catch (error) {
		next(error);
	}
};

// post /api/v1/auth/refresh_token
export const refresh_token = async (req: Request, res: Response) => {
	try {
		const token: string = req.cookies.jid;
		let payload: any = null;

		if (!token) {
			return res.send({ ok: false, accessToken: '' });
		}

		try {
			payload = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
		} catch (error) {
			return res.send({ ok: false, accessToken: '' });
		}

		const user = await prisma.user.findUnique({ where: { id: String(payload.userId) } });

		if (!user) {
			return res.send({ ok: false, accessToken: '' });
		}

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: '' });
		}

		sendRefreshToken(res, createRefreshToken(user));
		res.send({ ok: true, accessToken: createAccessToken(user) });
	} catch (error) {
		return res.status(500).send({ error, ok: false, accessToken: '' });
	}
};
