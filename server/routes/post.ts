import express from "express";
import * as Post from "../controllers/post-controller";

const router = express.Router();

router.get('/', Post.getPost);
router.post('/', Post.addPost);
router.get('/search', Post.searchPost);
router.put('/:postId', Post.updateById);
router.delete('/:postId', Post.deleteById);

export default router;
