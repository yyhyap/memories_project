import express, { Router } from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
// patch is for update existing document
router.patch('/:id', updatePost);

export default router;