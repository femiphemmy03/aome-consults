import express from 'express';
import {
  listPublishedBooks,
  listAllBooksAdmin,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', listPublishedBooks);

// Admin
router.get('/admin/all', requireAdminAuth, listAllBooksAdmin);
router.post('/admin', requireAdminAuth, createBook);
router.put('/admin/:id', requireAdminAuth, updateBook);
router.delete('/admin/:id', requireAdminAuth, deleteBook);

export default router;
