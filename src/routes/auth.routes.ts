import express from "express";
import * as authControllers from "controllers/auth.controllers";
import { admin, user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/register", authControllers.register, prismaErrorHandler);
router.post("/login", authControllers.login, prismaErrorHandler);
router.post("/logout", user, authControllers.logout);
router.get("/users", admin, authControllers.users, prismaErrorHandler);
router.post(
    "/users/search",
    admin,
    authControllers.searchUsers,
    prismaErrorHandler
);
router.patch(
    "/users/:id/roles",
    admin,
    authControllers.changeUserRole,
    prismaErrorHandler
);
router.delete(
    "/users/:id",
    admin,
    authControllers.deleteUser,
    prismaErrorHandler
);
router.get("/users/me", user, authControllers.getMe, prismaErrorHandler);
router.get("/refresh_token", authControllers.refresh_token);

export default router;
