import express from "express";
import * as booksControllers from "controllers/books.controllers";
import { user } from "middleware/auth.middleware";
import { prismaErrorHandler } from "errors/prisma.errors";

const router = express.Router();

router.post("/", booksControllers.addBook, prismaErrorHandler);

export default router;
