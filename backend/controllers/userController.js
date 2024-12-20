const User = require('../Models/user');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
  const { email, password ,profile } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = await User.create({  email, password , profile });

      // Generate a JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.LOGIN_EXPIRES });

     // Send token as a cookie
     res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    )
  });

      res.status(201).json({
          message: 'Registration successful',
          user:newUser,
          token,
      });
  } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.LOGIN_EXPIRES});

      // Send token as a cookie
      res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        )
      });

      res.status(200).json({ message: 'Login successful', token,user });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User Logged Out!",
      });
};



exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fields allowed to be updated
    const { profile } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the profile fields if provided
    if (profile) {
      user.profile = { ...user.profile, ...profile };
    }

    // Save the updated user data
    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email, // Email remains unchanged
        profile: updatedUser.profile,
      },
    });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

