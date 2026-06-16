import Wishlist from '../models/Wishlist.js';
import User from '../models/User.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist/:uid
// @access  Public
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const wishlistItems = await Wishlist.find({ userId: user._id });
        res.json(wishlistItems.map(item => item.productId)); // Return array of product IDs matching frontend
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Public
export const addToWishlist = async (req, res) => {
    try {
        const { firebaseUid, productId } = req.body;
        
        const user = await User.findOne({ firebaseUid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        let item = await Wishlist.findOne({ userId: user._id, productId });
        if (item) {
            return res.status(200).json(item); // Already exists
        }

        item = await Wishlist.create({ userId: user._id, productId });
        res.status(201).json(item);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key
            return res.status(400).json({ message: 'Item already in wishlist' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:uid/:productId
// @access  Public
export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Wishlist.findOneAndDelete({ userId: user._id, productId: req.params.productId });
        res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
