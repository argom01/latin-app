import type { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { verify } from "jsonwebtoken";
import createHttpError from "http-errors";
import { createAccessToken, createRefreshToken } from "shared/auth";
import sendRefreshToken from "shared/sendRefreshToken";
import prisma from "shared/prisma";
import type { TLoginData, TRegisterData } from "types/auth.types";

// [POST] /api/v1/auth/register
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, email, password, role }: TRegisterData =
            req.body.data;
        const hashedPassword = await hash(password, 12);

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
            },
        });

        res.send("User created successfully");
    } catch (error) {
        console.log(error);
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

// [DELETE] /api/v1/auth/users/:id
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        if (!id) {
            return next(createHttpError(400, "No user id provided"));
        }

        await prisma.user.delete({
            where: { id },
        });

        res.send("User deleted successfully");
    } catch (error) {
        next(error);
    }
};

// [PATCH] /api/v1/auth/users/:id
export const changeUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const { role }: { role: "ADMIN" | "USER" } = req.body.data;

        if (!id) {
            return next(createHttpError(400, "No user id provided"));
        }

        await prisma.user.update({
            where: {
                id,
            },
            data: {
                role,
            },
        });

        res.send("User updated successfully");
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/auth/users
export const users = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
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

// [POST] /api/v1/auth/refresh_token
export const refresh_token = async (req: Request, res: Response) => {
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
