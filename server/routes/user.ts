import express from "express";
import * as User from "../controllers/user-controller";
import { authenticate } from '../services/auth-service';

const router = express.Router();
router.get("/:id", authenticate, User.getUserById);
router.get("/:id/getFriendsSuggestions", authenticate, User.getFriendsSuggestions);
router.get("/:id/getUserImage", authenticate, User.getUserImage);
router.put("/:id/updateImage", authenticate, User.updateImage);
router.post("/:id/sendFriendRequest", authenticate, User.sendFriendRequest);
router.post("/:id/respondFriendRequest", authenticate, User.respondFriendRequest);

export default router;
