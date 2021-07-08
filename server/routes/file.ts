import express from 'express';
import uploadFile from '../services/upload-service';
import multer from 'multer';
import { CustomError } from '../services/error-service';

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  uploadFile(req, res, function (err: unknown) {
    if (err instanceof multer.MulterError) {
      return next(new CustomError(500, 'Multer error!'));
    } else if (err) {
      return next(new CustomError(500, 'Internal server error!'));
    }
    res.status(201).send({ message: 'File upload successfully!' });
  });
});

export default router;
