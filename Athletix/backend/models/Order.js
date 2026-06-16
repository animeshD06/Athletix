import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String },
  image: { type: String },
  selectedColor: { type: String },
  selectedSize: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  subtotal: { type: Number, required: true }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Order Details
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  
  // Payment Information
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentDetails: {
    razorpay_payment_id: { type: String },
    razorpay_order_id: { type: String },
    razorpay_signature: { type: String }
  },
  
  // Shipping Information
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  
  // Status
  orderStatus: { type: String, enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'confirmed' },
  trackingNumber: { type: String },
  notes: { type: String },
  
  items: [orderItemSchema],

  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  cancelledAt: { type: Date }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
