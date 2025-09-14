// backend/config/firebase.js
const admin = require('firebase-admin');
const path = require('path');

// Use path.join to create a cross-platform path to your service account key
// __dirname is the current directory (backend/config)
// We use '..' twice to go up two levels to the backend folder
const serviceAccountPath = path.join(__dirname, '..', process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

// The 'serviceAccount' variable is declared only once here
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;