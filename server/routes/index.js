import express from "express";
const router = express.Router();

import user from "./user.js";
import post from "./post.js";
import file from "./file.js";

router.use("/user", user);
router.use("/post", post);
router.use("/file", file);

export default router;
