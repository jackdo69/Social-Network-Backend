import express from 'express';

const router = express.Router();

router.get('/posts', (req,res,next) => {
    res.status(200).send({message: 'All Posts Page'})
})