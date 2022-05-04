import express from "express";
import * as usersControllers from "controllers/users.controllers";
import { admin, user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.get("/users", admin, usersControllers.users, prismaErrorHandler);
router.post(
    "/users/search",
    admin,
    usersControllers.searchUsers,
    prismaErrorHandler
);
router.patch(
    "/users/:id/roles",
    admin,
    usersControllers.changeUserRole,
    prismaErrorHandler
);
router.delete(
    "/users/:id",
    admin,
    usersControllers.deleteUser,
    prismaErrorHandler
);
router.get("/users/me", user, usersControllers.getMe, prismaErrorHandler);
