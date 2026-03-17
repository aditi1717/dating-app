import express from 'express';
import {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';
import { uploadChatImage } from '../config/cloudinary.js';

const router = express.Router();

router.post('/send/:receiverId', protect, uploadChatImage.single('image'), sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/conversation/:userId', protect, getConversation);
router.put('/read/:senderId', protect, markAsRead);
router.delete('/:messageId', protect, deleteMessage);

export default router;
