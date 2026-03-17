import Admin from '../models/Admin.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { generateToken, generateRefreshToken, setCookie, clearCookie } from '../utils/tokenUtils.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

// @desc Admin Register (Create first admin)
// @route POST /api/admin/register
// @access Public (should be protected in production)
export const adminRegister = asyncHandler(async (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body;

  // Validate input
  if (!username || !email || !password) {
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

  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  }

  // Check if admin already exists
  let admin = await Admin.findOne({ $or: [{ email }, { username }] });

  if (admin) {
    return res.status(400).json({
      success: false,
      message: 'Admin already exists with that email or username',
    });
  }

  // Create admin
  admin = await Admin.create({
    username,
    email,
    password,
    firstName,
    lastName,
    role: 'admin',
  });

  // Generate tokens
  const token = generateToken(admin._id, 'admin');
  const refreshToken = generateRefreshToken(admin._id);

  // Set cookies
  setCookie(res, token, refreshToken, 'adminToken', 'adminRefreshToken');

  res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc Admin Login
// @route POST /api/admin/login
// @access Public
export const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  // Check for admin
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if account is locked
  if (admin.isLocked()) {
    return res.status(403).json({
      success: false,
      message: 'Account locked due to multiple failed login attempts. Try again later.',
    });
  }

  // Check if password matches
  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    admin.incLoginAttempts();
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Reset login attempts on successful login
  if (admin.loginAttempts > 0) {
    admin.resetLoginAttempts();
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save();

  // Generate tokens
  const token = generateToken(admin._id, admin.role);
  const refreshToken = generateRefreshToken(admin._id);

  // Set cookies
  setCookie(res, token, refreshToken, 'adminToken', 'adminRefreshToken');

  res.status(200).json({
    success: true,
    message: 'Admin logged in successfully',
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  });
});

// @desc Admin Logout
// @route POST /api/admin/logout
// @access Private
export const adminLogout = asyncHandler(async (req, res, next) => {
  clearCookie(res, 'adminToken', 'adminRefreshToken');

  res.status(200).json({
    success: true,
    message: 'Admin logged out successfully',
  });
});

// @desc Get current admin
// @route GET /api/admin/me
// @access Private
export const getCurrentAdmin = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);

  res.status(200).json({
    success: true,
    admin,
  });
});
