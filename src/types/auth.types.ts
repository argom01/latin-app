export type TRegisterData = {
	username: string;
	email: string;
	password: string;
	role: 'ADMIN' | 'USER';
};

export type TLoginData = {
	email: string;
	password: string;
};
