const User = require('../models/User');

/**
 * Register a new user
 * POST /api/users/register
 */
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      if (existingUser.userName === userName) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Create avatar URL
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

    // Create new user
    const user = new User({
      userName,
      email,
      password,
      avatar,
    });

    await user.save();

    // Return user without password
    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

/**
 * Login user
 * POST /api/users/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return user without password
    res.json({
      message: 'Login successful',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

/**
 * Get user profile
 * GET /api/users/:id
 */
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.toJSON());
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

/**
 * Update user profile
 * PUT /api/users/:id
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating certain fields
    delete updateData._id;
    delete updateData.email; // Email can't be changed
    delete updateData.createdAt;

    // If password is being updated, it will be hashed by the pre-save hook
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};
