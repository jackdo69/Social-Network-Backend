import express from "express";
const router = express.Router();

import user from "./user";
import post from "./post";
import file from "./file";

router.use("/user", user);
router.use("/post", post);
router.use("/file", file);

export default router;
