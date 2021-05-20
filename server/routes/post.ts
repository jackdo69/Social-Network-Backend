import express from "express";
import * as Post from "../controllers/post-controller";
import { authenticate } from '../services/auth-service';

const router = express.Router();

router.get('/', authenticate, Post.getPost);
router.post('/', authenticate, Post.addPost);
router.get('/search', authenticate, Post.searchPost);
router.put('/:id', authenticate, Post.updateById);
router.delete('/:id', authenticate, Post.deleteById);

export default router;
