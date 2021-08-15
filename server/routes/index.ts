import express from 'express';
const router = express.Router();

import auth from './auth';
import post from './post';
import file from './file';
import user from './user';
import message from './message';

router.use('/auth', auth);
router.use('/post', post);
router.use('/file', file);
router.use('/user', user);
router.use('/message', message);

export default router;
