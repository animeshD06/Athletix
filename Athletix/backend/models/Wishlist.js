import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true } // Product IDs are still kept from frontend logic / data
}, { timestamps: true });

// Prevent duplicate items for a user in wishlist
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
