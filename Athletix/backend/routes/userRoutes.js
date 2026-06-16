import express from 'express';
import {
    upsertUser,
    getUserProfile,
    updateUserProfile,
    getUserAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from '../controllers/userController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: upsert is called during login/signup (token is fresh, user may not exist yet)
router.post('/', protect, upsertUser);

// Protected + Owner Only: user can only view/edit their own profile
router.route('/:uid')
    .get(protect, ownerOnly, getUserProfile)
    .put(protect, ownerOnly, updateUserProfile);

// Protected + Owner Only: address CRUD
router.route('/:uid/addresses')
    .get(protect, ownerOnly, getUserAddresses)
    .post(protect, ownerOnly, addAddress);

router.route('/:uid/addresses/:addressId')
    .put(protect, ownerOnly, updateAddress)
    .delete(protect, ownerOnly, deleteAddress);

router.put('/:uid/addresses/:addressId/default', protect, ownerOnly, setDefaultAddress);

export default router;
