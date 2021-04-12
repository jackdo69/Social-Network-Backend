import util from "util";
import multer from "multer";
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log(__dirname);
    cb(null, __dirname + "/public/images/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");


export default uploadFile;
