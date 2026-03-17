import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc Get paginated users for moderation
// @route GET /api/admin/users
// @access Private/Admin
export const getModerationUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page || '1', 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '8', 10), 1), 50);
  const skip = (page - 1) * limit;
  const search = (req.query.search || '').trim();

  const query = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phoneNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const [users, totalUsers] = await Promise.all([
    User.find(query)
      .select(
        'firstName lastName email phoneNumber profilePicture galleryImages isPremium premiumExpiry isVerified isActive isBanned banReason bannedAt createdAt age gender bio interests relationshipGoal education profession smokingStatus drinkingStatus location.address location.city location.state'
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(query),
  ]);

  const normalizedUsers = users.map((user) => ({
    ...user.toObject(),
    subscriptionName: user.isPremium ? 'Premium' : 'Free',
  }));

  res.status(200).json({
    success: true,
    users: normalizedUsers,
    pagination: {
      page,
      limit,
      totalUsers,
      totalPages: Math.max(Math.ceil(totalUsers / limit), 1),
    },
  });
});

// @desc Ban a user
// @route PATCH /api/admin/users/:id/ban
// @access Private/Admin
export const banUser = asyncHandler(async (req, res) => {
  const reason = (req.body.reason || 'Banned by admin').trim();

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.isBanned = true;
  user.banReason = reason;
  user.bannedAt = new Date();
  user.bannedBy = req.admin?.id || null;
  user.isActive = false;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User banned successfully',
    user,
  });
});

// @desc Unban a user
// @route PATCH /api/admin/users/:id/unban
// @access Private/Admin
export const unbanUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  user.isBanned = false;
  user.banReason = '';
  user.bannedAt = null;
  user.bannedBy = null;
  user.isActive = true;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User unbanned successfully',
    user,
  });
});
