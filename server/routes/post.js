import express from "express";
import PostService from "../services/PostService.js";

const postService = new PostService();

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const result = await postService.getPost(req.query);
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await postService.addPost(req.body);
    res.status(201).send({ message: "Post created successfully!" });
  } catch (e) {
    next(e);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const result = await postService.searchPost(req.query);
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    await postService.deleteById(req.params);
    res.status(202).send({ message: "Post deleted successfully!" });
  } catch (e) {
    next(e);
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { document } = req.body;
    await postService.updateById({ postId, document });
    res.status(202).send({ message: "Post updated successfully!" });
  } catch (e) {
    next(e);
  }
});

export default router;
