import express from 'express';
import { getPublicSettings, updateSettings } from '../controllers/settingsController.js';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicSettings);
router.put('/admin', requireAdminAuth, updateSettings);

export default router;
