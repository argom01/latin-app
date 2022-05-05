import express from "express";
import * as usersControllers from "controllers/users.controllers";
import { admin, user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.get("/:id", admin, usersControllers.getUser, prismaErrorHandler);
router.post("/search", admin, usersControllers.searchUsers, prismaErrorHandler);
router.patch(
    "/:id/roles",
    admin,
    usersControllers.changeUserRole,
    prismaErrorHandler
);
router.delete("/:id", admin, usersControllers.deleteUser, prismaErrorHandler);
router.get("/me", user, usersControllers.getMe, prismaErrorHandler);

export default router;
