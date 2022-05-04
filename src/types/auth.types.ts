export type TRegisterData = {
    username: string;
    email: string;
    password: string;
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TUserSearchData = {
    input: string;
    pagination?: number;
};
