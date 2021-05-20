import * as esClient from "../services/elasticsearch-service";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../services/error-service";
import { Request, Response, NextFunction } from 'express';

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { size } = req.query;
    if (!size) return next(new CustomError(422, "Missing required parameters!"));

    const results = await esClient.queryBySize(
      "post",
      {
        from: 0,
        size: +size,
      }
    );

    const posts = results.map((item) => {
      return {
        id: item._id,
        title: item._source.title,
        content: item._source.content,
        user: item._source.user,
        createdAt: item._source.createdAt,
        image: item._source.image,
      };
    });
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    next(new CustomError(500, "Internal server error!"));
  }
};

const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, user, image } = req.body;
    const createdAt = new Date().getTime();
    if (!title || !content || !user)
      return next(new CustomError(422, "Missing required parameters!"));
    const id = uuidv4();
    await esClient.store(
      "post",
      id,
      {
        title,
        content,
        user,
        createdAt,
        image,
      },
    );
    res.status(201).send({
      message: "Post created successfully!",
      result: { id, title, content, user, createdAt, image }
    });
  } catch (err) {
    console.log(err);
    return next(new CustomError(500, "Internal server error!"));
  }
};

const searchPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phrase, field } = req.query;
    if (!phrase || !field) return next(new CustomError(422, "Missing required parameters!"));
    const results = await esClient.searchBySingleField(
      "post",
      {
        field: JSON.stringify(field),
        phrase: JSON.stringify(phrase)
      },
    );
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    return next(new CustomError(500, "Internal server error!"));
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, title } = req.body;
    const { id } = req.params;
    const existedPost = await esClient.checkExist('post', id);

    if (!existedPost) return next(new CustomError(404, "Post not found!"));
    const doc = { content, title };
    await esClient.updateById('post', id, doc);
    res.status(202).json({ message: "Update success!" });
  } catch (err) {
    console.log(err);
    return next(new CustomError(500, "Internal server error!"));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(422, "Missing required parameters!"));
    await esClient.remove(
      "post", id
    );
    res.status(202).send({ message: "Post deleted successfully!" });
  } catch (err) {
    console.log(err);
    return next(new CustomError(500, "Internal server error!"));
  }
};


export {
  getPost, addPost, searchPost, updateById, deleteById
};
