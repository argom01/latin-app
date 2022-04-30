import type { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
	return sign({ userId: user.id, role: user.role }, process.env.JWT_ACCESS_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

export const createRefreshToken = (user: User) => {
	return sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.JWT_REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	});
};
