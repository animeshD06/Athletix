import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// For verifying ID tokens, we only need the project ID
// No service account key file needed for token verification
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'athletix-15748'
    });
}

export default admin;
