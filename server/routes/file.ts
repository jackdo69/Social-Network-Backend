import express from "express";
import uploadFile from "../lib/upload";
import multer from "multer";
import { ErrorHandler } from "../lib/error";

const router = express.Router();

router.post("/upload", async (req, res, next) => {
  try {
    uploadFile(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        throw new ErrorHandler(500, "Multer error!");
      } else if (err) {
        throw new ErrorHandler(500, "Internal server error!");
      }
    });
    res.status(201).send({ message: "File upload successfully!" });
  } catch (e) {
    next(e);
  }
});

export default router;
