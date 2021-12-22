import express, { Router } from 'express';

import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
// patch is for update existing document
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;