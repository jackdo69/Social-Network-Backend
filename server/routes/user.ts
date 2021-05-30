import express from "express";
import * as User from "../controllers/user-controller";
import { authenticate } from '../services/auth-service';

const router = express.Router();
router.get("/:id", authenticate, User.getUser);
router.post("/:id/updateImage", User.updateImage);

export default router;
