// src/middleware/auth.js
const admin = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
  // 1. Get the token from the request header
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  // 2. If no token is provided, return an error
  if (!idToken) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {
    // 3. Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // 4. Attach the Firebase UID to the request object for use in controllers
    req.userId = firebaseUid;
    next();
  } catch (error) {
    // 5. If the token is invalid, return an error
    console.error('Error verifying Firebase token:', error);
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = authMiddleware;