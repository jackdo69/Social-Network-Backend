import * as esClient from "../services/elasticsearch-service";
import { CustomError } from "../services/error-service";
import { Request, Response, NextFunction } from 'express';

const INDEX = process.env.NODE_ENV === 'dev' ? 'user' : 'user-test';
const NOTIFICATIONS = 'notifications';
const REQUEST_SENT = 'requestSent';
const FRIENDS = 'friends';

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(422, "Missing required parameters!"));

    const result = await esClient.queryById(
      INDEX, id
    );
    delete result.password;
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    next(new CustomError(500, "Internal server error!"));
  }
};

const getFriendsSuggestions = async (req: Request, res: Response, next: NextFunction) => {

};

const sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { recipientId } = req.body;
    if (!id || !recipientId) return next(new CustomError(422, "Missing required parameters!"));
    const user = await esClient.queryById(INDEX, id);
    const recipient = await esClient.queryById(INDEX, recipientId);
    const notification = {
      action: 'friendRequest',
      id,
      username: user.username,
      message: `${user.username} sent you a friend request`
    };
    const friendRequest = {
      id: recipientId,
      username: recipient.username
    };
    if (!user || !recipient) return next(new CustomError(422, "Can not find user!"));
    await esClient.upsertItemIntoField(INDEX, id, REQUEST_SENT, friendRequest);
    await esClient.upsertItemIntoField(INDEX, recipientId, NOTIFICATIONS, notification);
    res.status(202).json({ message: "Your friend request is sent!" });
  } catch (e) {
    console.log(e);
    next(new CustomError(500, "Internal server error!"));
  }
};

const respondFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { senderId, response } = req.body;
    if (!id || !senderId) return next(new CustomError(422, "Missing required parameters!"));
    const user = await esClient.queryById(INDEX, id);
    const sender = await esClient.queryById(INDEX, senderId);
    if (!user || !sender) return next(new CustomError(422, "Can not find user!"));
    //remove notifications and request sent
    const notificationIndex = user[NOTIFICATIONS].findIndex(i => i.id === senderId);
    const requestIndex = sender[REQUEST_SENT].findIndex(i => i.id === id);
    if (notificationIndex !== -1 && requestIndex !== -1) {
      await esClient.removeItemFromField(INDEX, id, NOTIFICATIONS, notificationIndex);
      await esClient.removeItemFromField(INDEX, senderId, REQUEST_SENT, requestIndex);
    }
    //add user to other's friend list
    if (response === 'accept') {
      await esClient.upsertItemIntoField(INDEX, id, FRIENDS, { id: senderId, username: sender.username });
      await esClient.upsertItemIntoField(INDEX, senderId, FRIENDS, { id, username: user.username });
      res.status(202).json({ message: `You and ${sender.username} are friends now!` });
    } else {
      res.status(202).json({ message: `You refused the friend request!` });
    }
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    next(new CustomError(500, "Internal server error!"));
  }
};



export {
  getUserById,
  updateImage,
  sendFriendRequest,
  respondFriendRequest
};
