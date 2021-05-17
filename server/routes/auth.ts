import express from "express";
import * as User from "../controllers/auth-controller";

const router = express.Router();
router.post("/register", User.register);
router.post("/login", User.login);
router.post("/logout", User.logout);
router.post("/renewToken", User.renewToken);

export default router;
