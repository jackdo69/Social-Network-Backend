import express from "express";
const router = express.Router();

import auth from "./auth";
import post from "./post";
import file from "./file";

router.use("/auth", auth);
router.use("/post", post);
router.use("/file", file);

export default router;
