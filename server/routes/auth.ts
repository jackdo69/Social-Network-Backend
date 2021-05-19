import express from "express";
import * as Auth from "../controllers/auth-controller";

const router = express.Router();
router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.delete("/logout", Auth.logout);
router.post("/renewToken", Auth.renewToken);

export default router;
