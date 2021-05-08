var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import uploadFile from "../lib/upload.js";
import multer from "multer";
import { ErrorHandler } from "../lib/error.js";
const router = express.Router();
router.post("/upload", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        uploadFile(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                throw new ErrorHandler(500, "Multer error!");
            }
            else if (err) {
                throw new ErrorHandler(500, "Internal server error!");
            }
        });
        res.status(201).send({ message: "File upload successfully!" });
    }
    catch (e) {
        next(e);
    }
}));
export default router;
//# sourceMappingURL=file.js.map