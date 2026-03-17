import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc Get user profile
// @route GET /api/users/:id
// @access Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Fields that can be updated
  const allowedFields = [
    'firstName',
    'lastName',
    'bio',
    'age',
    'interests',
    'relationshipGoal',
    'location',
    'height',
    'bodyType',
    'religion',
    'education',
    'profession',
    'smokingStatus',
    'drinkingStatus',
  ];

  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

// @desc Upload profile picture
// @route POST /api/users/:id/profile-picture
// @access Private
export const uploadProfilePicture = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { profilePicture: req.file.path },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile picture uploaded successfully',
    user,
  });
});

// @desc Add gallery images
// @route POST /api/users/:id/gallery
// @access Private
export const addGalleryImages = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded',
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  req.files.forEach((file) => {
    user.galleryImages.push({
      url: file.path,
      uploadedAt: new Date(),
    });
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: `${req.files.length} image(s) added successfully`,
    user,
  });
});

// @desc Delete gallery image
// @route DELETE /api/users/:id/gallery/:imageId
// @access Private
export const deleteGalleryImage = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.galleryImages = user.galleryImages.filter(
    (image) => image._id.toString() !== req.params.imageId
  );

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Image deleted successfully',
    user,
  });
});

// @desc Get discovery feed
// @route GET /api/users/discovery/feed
// @access Private
export const getDiscoveryFeed = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Build query to find matching profiles
  const query = {
    _id: { $ne: req.user.id },
    isBanned: false,
    $nor: [{ _id: { $in: currentUser.blockedUsers } }],
    interestedIn: currentUser.gender,
  };

  // If current user has gender preference, filter by it
  if (currentUser.interestedIn.includes(currentUser.interestedIn[0])) {
    query.gender = { $in: currentUser.interestedIn };
  }

  let users = await User.find(query).limit(20);

  // Shuffle and return
  users = users.sort(() => 0.5 - Math.random());

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// @desc Block user
// @route POST /api/users/:id/block/:blockedUserId
// @access Private
export const blockUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (!user.blockedUsers.includes(req.params.blockedUserId)) {
    user.blockedUsers.push(req.params.blockedUserId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User blocked successfully',
  });
});

// @desc Unblock user
// @route POST /api/users/:id/unblock/:blockedUserId
// @access Private
export const unblockUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.blockedUsers = user.blockedUsers.filter(
    (blockedUser) => blockedUser.toString() !== req.params.blockedUserId
  );

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User unblocked successfully',
  });
});

// @desc Report user
// @route POST /api/users/:id/report/:reportedUserId
// @access Private
export const reportUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (!user.reportedUsers.includes(req.params.reportedUserId)) {
    user.reportedUsers.push(req.params.reportedUserId);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User reported successfully',
  });
});
