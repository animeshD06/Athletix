import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, sparse: true }, // For Firebase auth mapping
  email: { type: String, unique: true, sparse: true, default: '' },
  displayName: { type: String },
  phone: { type: String },
  photoUrl: { type: String },
  authProvider: { type: String, default: 'email' },
  addresses: [addressSchema],
  lastLogin: { type: Date }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
