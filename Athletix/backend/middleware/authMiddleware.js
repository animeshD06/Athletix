import admin from '../config/firebaseAdmin.js';

/**
 * Auth Middleware — verifies Firebase ID token from Authorization header.
 * 
 * Expects: Authorization: Bearer <firebase-id-token>
 * Sets: req.user = { uid, email, ... } (decoded Firebase token)
 */
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized — no token provided' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded; // { uid, email, name, picture, ... }
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Not authorized — invalid token' });
    }
};

/**
 * Ownership Middleware — ensures the authenticated user can only access their own data.
 * Must be used AFTER protect() middleware.
 * 
 * Checks that the :uid param matches the authenticated user's Firebase UID.
 */
export const ownerOnly = (req, res, next) => {
    const paramUid = req.params.uid;
    if (paramUid && paramUid !== req.user.uid) {
        return res.status(403).json({ message: 'Forbidden — you can only access your own data' });
    }
    next();
};
