var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import PostService from "../services/PostService.js";
const postService = new PostService();
/**
 * @swagger
 * components:
 *    schemas:
 *      Post:
 *        type: object
 *        required:
 *          - title
 *          - content
 *          - user
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated if of the post
 *          title:
 *            type: string
 *            description: The post title
 *          content:
 *            type: string
 *            description: The post content
 *          user:
 *            type: string
 *            description: The author of the post
 *        example:
 *            id: a1b2
 *            title: A rainy day
 *            content: A rainy day is always so romantic
 *            user: Duc Anh
 */
/**
 * @swagger
 * tags:
 *    name: Posts
 *    description: The posts managing API
 */
const router = express.Router();
/**
 * @swagger
 * /post:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       422:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error!
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.getPost(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        next(e);
    }
}));
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       422:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error!
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.addPost(req.body);
        res
            .status(201)
            .send({ message: "Post created successfully!", result: result });
    }
    catch (e) {
        next(e);
    }
}));
/**
 * @swagger
 *    /post/search:
 *      get:
 *        summary: Search posts by phrase
 *        tags: [Posts]
 *        parameters:
 *          - in: query params
 *            name: phrase
 *            schema:
 *              type: string
 *            required: true
 *            description: the search phrase
 *        responses:
 *          200:
 *            description: The list of the posts
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Post'
 *          422:
 *            description: Missing required parameters!
 *          500:
 *            description: Internal server error!
 */
router.get("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService.searchPost(req.query);
        res.status(200).send(result);
    }
    catch (e) {
        next(e);
    }
}));
/**
 * @swagger
 * /post/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      202:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      422:
 *        description: Missing required parameters!
 *      500:
 *        description: Internal server error!
 */
router.put("/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { document } = req.body;
        yield postService.updateById({ postId, document });
        res.status(202).send({ message: "Post updated successfully!" });
    }
    catch (e) {
        next(e);
    }
}));
/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *
 *     responses:
 *       202:
 *         description: The book was deleted
 *       422:
 *         description: Missing required parameters!
 *       500:
 *        description: Internal server error!
 */
router.delete("/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postService.deleteById(req.params);
        res.status(202).send({ message: "Post deleted successfully!" });
    }
    catch (e) {
        next(e);
    }
}));
export default router;
//# sourceMappingURL=post.js.map