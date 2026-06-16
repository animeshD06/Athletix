import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
    try {
        const { firebaseUid, items, shippingAddress, paymentMethod, subtotal, tax, shipping, total, notes, paymentDetails } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const user = await User.findOne({ firebaseUid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const orderNumber = `ATH${Date.now()}`;
        
        const order = new Order({
            orderNumber,
            userId: user._id,
            items: items.map(i => ({
                productId: i.id,
                name: i.name,
                slug: i.slug,
                image: i.images?.[0],
                selectedColor: i.selectedColor,
                selectedSize: i.selectedSize,
                price: i.price,
                quantity: i.quantity,
                subtotal: i.price * i.quantity
            })),
            shippingAddress: {
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                street: shippingAddress.street,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode
            },
            paymentMethod,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
            paymentDetails,
            subtotal,
            tax: tax || 0,
            shippingCost: shipping || 0,
            total,
            notes
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders/:uid
// @access  Public
export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'email displayName');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.orderStatus = req.body.status;
            
            if (req.body.status === 'shipped') order.shippedAt = Date.now();
            if (req.body.status === 'delivered') order.deliveredAt = Date.now();
            if (req.body.status === 'cancelled') order.cancelledAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
