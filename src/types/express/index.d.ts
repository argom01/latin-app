declare namespace Express {
	interface Request {
		payload: {
			userId: string;
			role: 'ADMIN' | 'USER';
		};
	}
}
