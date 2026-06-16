import express from 'express';
import { createRazorpayOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Payment routes require authentication
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);

export default router;
