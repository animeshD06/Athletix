import express from 'express';
import { createOrder, getMyOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All order routes require authentication
router.post('/', protect, createOrder);
router.get('/myorders/:uid', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
