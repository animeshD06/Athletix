import User from '../models/User.js';

// @desc    Auth user / Upsert Profile
// @route   POST /api/users
// @access  Public
export const upsertUser = async (req, res) => {
    try {
        const { firebaseUid, email, displayName, phone, photoUrl, authProvider } = req.body;
        
        let user = await User.findOne({ firebaseUid });
        if (user) {
            user.lastLogin = Date.now();
            user.email = email || user.email;
            user.displayName = displayName || user.displayName;
            user.photoUrl = photoUrl || user.photoUrl;
            await user.save();
            return res.status(200).json(user);
        }

        user = await User.create({
            firebaseUid,
            email,
            displayName,
            phone,
            photoUrl,
            authProvider,
            lastLogin: Date.now()
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/:uid
// @access  Public (in real app, protect it)
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/:uid
// @access  Public
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (user) {
            user.displayName = req.body.displayName || user.displayName;
            user.phone = req.body.phone || user.phone;
            
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user addresses
// @route   GET /api/users/:uid/addresses
// @access  Public
export const getUserAddresses = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (user) {
            res.json(user.addresses);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add user address
// @route   POST /api/users/:uid/addresses
// @access  Public
export const addAddress = async (req, res) => {
    try {
        let user = await User.findOne({ firebaseUid: req.params.uid });

        // Auto-create user if not found (handles fresh Docker MongoDB)
        if (!user) {
            user = await User.create({
                firebaseUid: req.params.uid,
                email: '',
                displayName: '',
                lastLogin: Date.now()
            });
        }

        if (req.body.isDefault) {
            user.addresses.forEach(a => { a.isDefault = false; });
        }
        user.addresses.push(req.body);
        await user.save();
        res.status(201).json(user.addresses[user.addresses.length - 1]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user address
// @route   PUT /api/users/:uid/addresses/:addressId
// @access  Public
export const updateAddress = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const address = user.addresses.id(req.params.addressId);
        if (!address) return res.status(404).json({ message: 'Address not found' });
        
        if (req.body.isDefault) {
            user.addresses.forEach(a => { a.isDefault = false; });
        }
        
        address.set(req.body);
        await user.save();
        
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user address
// @route   DELETE /api/users/:uid/addresses/:addressId
// @access  Public
export const deleteAddress = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.addresses.pull({ _id: req.params.addressId });
        await user.save();
        
        res.json({ message: 'Address removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Set address as default
// @route   PUT /api/users/:uid/addresses/:addressId/default
// @access  Public
export const setDefaultAddress = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const address = user.addresses.id(req.params.addressId);
        if (!address) return res.status(404).json({ message: 'Address not found' });

        user.addresses.forEach(a => { a.isDefault = false });
        address.isDefault = true;
        
        await user.save();
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
