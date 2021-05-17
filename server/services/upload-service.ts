import util from "util";
import multer from "multer";
import path from 'path';

const base = path.resolve(path.dirname(''));

const MAX_SIZE = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, base + "/public/images/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE },
}).single("file");


export default uploadFile;
