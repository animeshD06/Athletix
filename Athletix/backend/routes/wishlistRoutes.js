import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All wishlist routes require authentication
router.get('/:uid', protect, getWishlist);
router.post('/', protect, addToWishlist);
router.delete('/:uid/:productId', protect, removeFromWishlist);

export default router;
