import Cart from '../models/Cart.js';
import User from '../models/User.js';

// @desc    Get user cart
// @route   GET /api/cart/:uid
// @access  Public
export const getCart = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const cartItems = await Cart.find({ userId: user._id });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
export const addToCart = async (req, res) => {
    try {
        const { firebaseUid, productId, quantity, selectedColor, selectedSize } = req.body;
        
        const user = await User.findOne({ firebaseUid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        let item = await Cart.findOne({ userId: user._id, productId, selectedColor, selectedSize });
        if (item) {
            item.quantity += quantity;
            await item.save();
            return res.status(200).json(item);
        }

        item = await Cart.create({ userId: user._id, productId, quantity, selectedColor, selectedSize });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:id
// @access  Public
export const updateCartItem = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);
        if (item) {
            item.quantity = req.body.quantity;
            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
export const removeFromCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Clear user cart
// @route   DELETE /api/cart/clear/:uid
// @access  Public
export const clearCart = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Cart.deleteMany({ userId: user._id });
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
