import express from "express";
import * as Post from "../controllers/post-controller";


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
 *          createdAt:
 *            type: string
 *            description: The time when the post was created
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

router.get('/', Post.getPost)

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

router.post('/', Post.addPost)

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

router.get('/search', Post.searchPost)

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

router.put('/:postId', Post.updateById)

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

router.delete('/:postId', Post.deleteById)

export default router;
