import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "shared/prisma";
import type { TUserSearchData } from "types/auth.types";

// [DELETE] /api/v1/auth/users/:id
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;

        if (!id) {
            return next(createHttpError(404));
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
            return next(createHttpError(404));
        }

        const isVerified = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                isVerified: true,
            },
        });

        if (!isVerified!.isVerified && role === "ADMIN") {
            return next(createHttpError(403, "User not validated"));
        }

        const updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: {
                role,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                isVerified: true,
            },
        });

        res.send(updatedUser);
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/auth/user/:id
export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        if (!id) {
            next(createHttpError(404));
        }

        const users = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                isVerified: true,
            },
        });
        res.send(users);
    } catch (error) {
        next(error);
    }
};

// [POST] /api/v1/auth/users/search
export const searchUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { input, pagination }: TUserSearchData = req.body.data;
        const users = await prisma.user.findMany({
            take: pagination || 10,
            where: {
                OR: [
                    {
                        email: {
                            contains: input,
                        },
                    },
                    {
                        username: {
                            contains: input,
                        },
                    },
                ],
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                isVerified: true,
            },
        });
        res.send(users);
    } catch (error) {
        next(error);
    }
};

// [GET] /api/v1/auth/users/me
export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const me = await prisma.user.findUnique({
            where: {
                id: req.payload.userId,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                isVerified: true,
            },
        });
        res.send(me);
    } catch (error) {
        next(error);
    }
};
