import express from 'express';
import {
  createBooking,
  verifyBookingPayment,
  getBooking,
  requestSchedule,
  listBookingsAdmin,
  confirmBookingAdmin
} from '../controllers/bookingController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { generalRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public
router.post('/', generalRateLimiter, createBooking);
router.post('/:id/verify-payment', verifyBookingPayment);
router.get('/:id', getBooking);
router.post('/:id/schedule', requestSchedule);

// Admin
router.get('/admin/all', requireAdminAuth, listBookingsAdmin);
router.patch('/admin/:id/confirm', requireAdminAuth, confirmBookingAdmin);

export default router;
