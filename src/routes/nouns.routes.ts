import express from "express";
import * as nounsControllers from "controllers/nouns.controllers";
import { prismaErrorHandler } from "errors/prisma.errors";
import { user } from "middleware/auth.middleware";

const router = express.Router();

router.post("/", nounsControllers.addNoun, prismaErrorHandler);

export default router;
