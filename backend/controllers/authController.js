// src/controllers/authController.js
const User = require('../models/user');

exports.getOrCreateUserProfile = async (req, res) => {
  try {
    // The auth middleware has already verified the token and attached the userId
    const userId = req.userId;

    // Find the user in your MongoDB database using their Firebase UID
    let user = await User.findOne({ userId: userId });

    // If the user doesn't exist, create a new document for them
    if (!user) {
      // You may want to get more data from the decoded token like email
      user = new User({ userId: userId });
      await user.save();
    }

    // Send the user's profile data back to the frontend
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching or creating user profile:', error);
    res.status(500).send('Server Error');
  }
};