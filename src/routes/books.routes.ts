import express from "express";
import * as booksControllers from "controllers/books.controllers";
import { user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/", user, booksControllers.addBook, prismaErrorHandler);
router.get("/", user, booksControllers.findBooks, prismaErrorHandler);
router.delete("/:id", user, booksControllers.deleteBook, prismaErrorHandler);
router.post(
    "/:id/chapters",
    user,
    booksControllers.addChapter,
    prismaErrorHandler
);
router.get(
    "/chapters/:id",
    user,
    booksControllers.findChapter,
    prismaErrorHandler
);
router.delete(
    "/chapters/:id",
    user,
    booksControllers.deleteChapter,
    prismaErrorHandler
);

export default router;
