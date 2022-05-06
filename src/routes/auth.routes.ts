import express from "express";
import * as authControllers from "controllers/auth.controllers";
import { user, verifyUrlToken } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/register", authControllers.register, prismaErrorHandler);
router.post("/login", authControllers.login, prismaErrorHandler);
router.post("/logout", user, authControllers.logout);
router.get("/refresh_token", authControllers.refreshToken);
router.get(
    "/confirmation",
    user,
    authControllers.resendConfirmationEmail,
    prismaErrorHandler
);
router.get(
    "/confirmation/:token",
    verifyUrlToken,
    authControllers.validateUser,
    prismaErrorHandler
);
router.post(
    "recover_account",
    authControllers.recoverAccount,
    prismaErrorHandler
);
router.post(
    "recover_account/:token",
    verifyUrlToken,
    authControllers.changePassword,
    prismaErrorHandler
);

export default router;
