import express from 'express';
import * as Message from '../controllers/message-controller';
import { authenticate } from '../services/auth-service';

const router = express.Router();

router.get('/', authenticate, Message.getMessages);
router.post('/', authenticate, Message.addMessage);

export default router;
