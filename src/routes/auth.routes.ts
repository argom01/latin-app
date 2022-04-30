import express from "express";
import * as authControllers from "controllers/auth.controllers";
import { admin, user } from "middleware/auth.middleware";

const router = express.Router();

router.post("/register", admin, authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", user, authControllers.logout);
router.get("/users", admin, authControllers.users);
router.delete("/users/:id", admin, authControllers.deleteUser);
router.get("/refresh_token", authControllers.refresh_token);

export default router;
