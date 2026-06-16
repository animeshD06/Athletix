import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes require authentication
router.get('/:uid', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, removeFromCart);
router.delete('/clear/:uid', protect, clearCart);

export default router;