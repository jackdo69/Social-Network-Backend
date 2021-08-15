import * as esClient from '../services/elasticsearch-service';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../services/error-service';
import { Request, Response, NextFunction } from 'express';

const INDEX = process.env.NODE_ENV === 'dev' ? 'message' : 'message-test';

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) return next(new CustomError(422, 'Missing required parameters!'));

    const results = await esClient.searchByMultipleFields(INDEX, {
      fields: [
        {
          filedName: 'senderId',
          fieldValue: senderId.toString(),
        },
        {
          filedName: 'receiverId',
          fieldValue: receiverId.toString(),
        },
      ],
    });

    const messages = results.map((item) => ({
      content: item._source.content,
      senderId: item._source.senderId,
      receiverId: item._source.receiverId,
      createdAt: item._source.createdAt,
    }));
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    next(new CustomError(500, 'Internal server error!'));
  }
};

const addMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, senderId, receiverId } = req.body;
    const createdAt = new Date().getTime();
    if (!senderId || !content || !receiverId) return next(new CustomError(422, 'Missing required parameters!'));
    const id = uuidv4();
    await esClient.store(INDEX, id, {
      content,
      senderId,
      receiverId,
      createdAt,
    });
    res.status(201).send({
      message: 'Message sent successfully!',
    });
  } catch (err) {
    console.log(err);
    return next(new CustomError(500, 'Internal server error!'));
  }
};

export { getMessages, addMessage };
