import express from 'express';
import { createLead, listLeads } from '../controllers/leadController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { generalRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', generalRateLimiter, createLead);
router.get('/admin/all', requireAdminAuth, listLeads);

export default router;
