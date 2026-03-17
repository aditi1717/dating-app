import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { generateToken, generateRefreshToken, setCookie, clearCookie } from '../utils/tokenUtils.js';
import { validateEmail, validatePhoneNumber, validatePassword } from '../utils/validators.js';

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, gender, age } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !phoneNumber || !password || !gender) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email',
    });
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid phone number',
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  }

  // Check if user already exists
  let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

  if (user) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with that email or phone number',
    });
  }

  // Create user
  user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    gender,
    age,
  });

  // Generate tokens
  const token = generateToken(user._id, 'user');
  const refreshToken = generateRefreshToken(user._id);

  // Set cookies
  setCookie(res, token, refreshToken);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
    },
  });
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Generate tokens
  const token = generateToken(user._id, 'user');
  const refreshToken = generateRefreshToken(user._id);

  // Update last seen
  user.lastSeen = new Date();
  await user.save();

  // Set cookies
  setCookie(res, token, refreshToken);

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      profilePicture: user.profilePicture,
    },
  });
});

// @desc Logout user
// @route POST /api/auth/logout
// @access Private
export const logout = asyncHandler(async (req, res, next) => {
  clearCookie(res, 'token', 'refreshToken');

  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
});

// @desc Refresh token
// @route POST /api/auth/refresh
// @access Public
export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token not found',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    const newToken = generateToken(user._id, 'user');
    const newRefreshToken = generateRefreshToken(user._id);

    setCookie(res, newToken, newRefreshToken);

    res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
    });
  }
});

// @desc Get current logged in user
// @route GET /api/auth/me
// @access Private
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
