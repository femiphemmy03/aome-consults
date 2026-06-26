import express from 'express';
import { handleImageUpload } from '../controllers/uploadController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

// Admin-only — used by the Books and Blog tabs to upload cover images.
router.post('/image', requireAdminAuth, uploadImage, handleImageUpload);

export default router;