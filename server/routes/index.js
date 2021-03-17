import express from "express";
const router = express.Router();

import user from "./user.js";
import post from "./post.js";

router.use("/user", user);
router.use("/post", post);

export default router;
