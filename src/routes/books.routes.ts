import express from "express";
import * as booksControllers from "controllers/books.controllers";
import { user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/books", booksControllers.addBook, prismaErrorHandler);
router.get("/books", booksControllers.findBooks, prismaErrorHandler);
router.post(
    "/books/:id/chapters",
    booksControllers.addChapter,
    prismaErrorHandler
);
router.get(
    "/books/chapters/:id",
    booksControllers.findChapter,
    prismaErrorHandler
);

export default router;
