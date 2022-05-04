import express from "express";
import * as authControllers from "controllers/auth.controllers";
import { user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/register", authControllers.register, prismaErrorHandler);
router.post("/login", authControllers.login, prismaErrorHandler);
router.post("/logout", user, authControllers.logout);
router.get("/refresh_token", authControllers.refreshToken);

export default router;
