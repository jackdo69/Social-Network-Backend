import * as esClient from "../services/elasticsearch-service";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../services/error-service";
import { Request, Response, NextFunction } from 'express';

const INDEX = process.env.NODE_ENV === 'dev' ? 'user' : 'user-test';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(422, "Missing required parameters!"));

    const result = await esClient.queryById(
      INDEX, id
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    next(new CustomError(500, "Internal server error!"));
  }
};

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(422, "Missing required parameters!"));
    const { image } = req.body;
    if (!image) return next(new CustomError(422, "Missing required parameters!"));
    const doc = { image };
    await esClient.updateById(INDEX, id, doc);
    res.status(202).json({ message: "Image upload success!" });
  } catch (err) {
    console.log('HIIIT',err);
    next(new CustomError(500, "Internal server error!"));
  }
};



export {
  getUser, updateImage
};
