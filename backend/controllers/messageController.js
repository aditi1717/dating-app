import Message from '../models/Message.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc Send message
// @route POST /api/messages/send/:receiverId
// @access Private
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const sender = req.user.id;
  const receiver = req.params.receiverId;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message content is required',
    });
  }

  let newMessage = await Message.create({
    sender,
    receiver,
    message,
    image: req.file ? req.file.path : null,
  });

  newMessage = await newMessage.populate('sender', 'firstName lastName profilePicture');
  newMessage = await newMessage.populate('receiver', 'firstName lastName profilePicture');

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: newMessage,
  });
});

// @desc Get conversation
// @route GET /api/messages/conversation/:userId
// @access Private
export const getConversation = asyncHandler(async (req, res, next) => {
  const userId1 = req.user.id;
  const userId2 = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: userId1, receiver: userId2 },
      { sender: userId2, receiver: userId1 },
    ],
  })
    .populate('sender', 'firstName lastName profilePicture')
    .populate('receiver', 'firstName lastName profilePicture')
    .sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
});

// @desc Get all conversations (chat list)
// @route GET /api/messages/conversations
// @access Private
export const getConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Get all unique conversations
  const messages = await Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('sender', 'firstName lastName profilePicture')
    .populate('receiver', 'firstName lastName profilePicture')
    .sort({ createdAt: -1 });

  // Build unique conversations
  const conversationMap = new Map();

  messages.forEach((msg) => {
    const otherUserId = msg.sender._id.toString() === userId ? msg.receiver._id : msg.sender._id;
    const key = [userId, otherUserId].sort().join('_');

    if (!conversationMap.has(key)) {
      conversationMap.set(key, {
        otherUser: msg.sender._id.toString() === userId ? msg.receiver : msg.sender,
        lastMessage: msg.message,
        lastMessageTime: msg.createdAt,
        lastMessageImage: msg.image,
        unreadCount: 0,
      });
    }

    // Count unread messages
    if (msg.receiver._id.toString() === userId && !msg.isRead) {
      conversationMap.get(key).unreadCount += 1;
    }
  });

  const conversations = Array.from(conversationMap.values()).sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );

  res.status(200).json({
    success: true,
    count: conversations.length,
    conversations,
  });
});

// @desc Mark messages as read
// @route PUT /api/messages/read/:senderId
// @access Private
export const markAsRead = asyncHandler(async (req, res, next) => {
  const receiver = req.user.id;
  const sender = req.params.senderId;

  await Message.updateMany(
    {
      sender,
      receiver,
      isRead: false,
    },
    {
      $set: { isRead: true, readAt: new Date() },
    }
  );

  res.status(200).json({
    success: true,
    message: 'Messages marked as read',
  });
});

// @desc Delete message
// @route DELETE /api/messages/:messageId
// @access Private
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.messageId);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
  });
});
