import express from "express";
import * as nounsControllers from "controllers/nouns.controllers";
import { user } from "middleware/auth.middleware";

const router = express.Router();

router.post("/", nounsControllers.addNoun);

export default router;
