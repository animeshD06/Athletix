import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedColor: { type: String },
  selectedSize: { type: String }
}, { timestamps: true });

// Index for unique item configuration in cart
cartItemSchema.index({ userId: 1, productId: 1, selectedColor: 1, selectedSize: 1 }, { unique: true });

export default mongoose.model('Cart', cartItemSchema);
