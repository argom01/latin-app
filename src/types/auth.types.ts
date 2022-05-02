export interface IRegisterData {
	username: string;
	email: string;
	password: string;
	role: 'ADMIN' | 'USER';
}

export interface ILoginData {
	email: string;
	password: string;
}
