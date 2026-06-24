import express from 'express';
import {
  listPublishedPosts,
  getPostBySlug,
  listAllPostsAdmin,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogController.js';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', listPublishedPosts);
router.get('/:slug', getPostBySlug);

// Admin
router.get('/admin/all', requireAdminAuth, listAllPostsAdmin);
router.post('/admin', requireAdminAuth, createPost);
router.put('/admin/:id', requireAdminAuth, updatePost);
router.delete('/admin/:id', requireAdminAuth, deletePost);

export default router;
