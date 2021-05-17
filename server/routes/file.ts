import express from "express";
import uploadFile from "../services/upload-service";
import multer from "multer";
import { CustomError } from "../services/error-service";

const router = express.Router();

router.post("/upload", async (req, res, next) => {
  try {
    uploadFile(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        throw new CustomError(500, "Multer error!");
      } else if (err) {
        throw new CustomError(500, "Internal server error!");
      }
    });
    res.status(201).send({ message: "File upload successfully!" });
  } catch (e) {
    next(e);
  }
});

export default router;
