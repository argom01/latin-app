import type { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { verify } from "jsonwebtoken";
import createHttpError from "http-errors";
import { createAccessToken, createRefreshToken } from "shared/auth";
import sendRefreshToken from "shared/sendRefreshToken";
import prisma from "shared/prisma";
import type { TLoginData, TRegisterData } from "types/auth.types";
import { sendPasswordResetEmail, sendVerificationEmail } from "mail/mail";

// endpoint na /api/v1/auth/recover_account [get]
// wysyla maila z tokenem
// zmienic routy bez parametrow na not found
// endpoint na /api/v1/auth/recover_account/:token [?get]
// ?odsyla strone z formularzem
// endpoint na /api/v1/auth/recover_account/:token [post]
// zmienia haslo i inkrementuje wersje tokena

// [POST] /api/v1/auth/register
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, email, password }: TRegisterData = req.body.data;

        if (!password) {
            return next(createHttpError(400, "No password"));
        }

        const hashedPassword = await hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        sendVerificationEmail(user);
        sendRefreshToken(res, createRefreshToken(user));
        res.send({ ok: true, accessToken: createAccessToken(user) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// [GET] /api/v1/auth/confirmation
export const resendConfirmationEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.payload.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        sendVerificationEmail(user!);
        res.send("Verification email resent");
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/auth/confirmation/:token
export const validateUser = async (
    payload: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await prisma.user.update({
            where: {
                id: payload.userId,
            },
            data: {
                isVerified: true,
            },
        });
        res.send("User verified successfully");
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/auth/login
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password }: TLoginData = req.body.data;

        if (!password) {
            return next(createHttpError(400, "No password"));
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            return next(createHttpError(401, "Bad password"));
        }

        sendRefreshToken(res, createRefreshToken(user));
        res.send({ ok: true, accessToken: createAccessToken(user) });
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/auth/logout
export const logout = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        sendRefreshToken(res, "");
        res.send({ ok: true, accessToken: "" });
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/recover_account
export const recoverAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.body.data;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        sendPasswordResetEmail(user!);
        res.send("Verification email sent");
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/recover_account/:token
export const changePassword = async (
    payload: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { password } = req.body.data;
        if (!password) {
            return next(createHttpError(400, "No password"));
        }

        const hashedPassword = await hash(password, 12);

        await prisma.user.update({
            where: {
                id: payload.userId,
            },
            data: {
                password: hashedPassword,
            },
        });
        res.send("Password updated");
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/auth/refresh_token
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token: string | undefined = req.cookies.jid;
        let payload: any = null;

        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        try {
            payload = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET!);
        } catch (error) {
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await prisma.user.findUnique({
            where: { id: String(payload.userId) },
        });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ ok: true, accessToken: createAccessToken(user) });
    } catch (error) {
        return res.status(500).send({ error, ok: false, accessToken: "" });
    }
};
