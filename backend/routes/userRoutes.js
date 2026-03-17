import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  addGalleryImages,
  deleteGalleryImage,
  getDiscoveryFeed,
  blockUser,
  unblockUser,
  reportUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadProfilePicture as uploadProfilePictureMiddleware, uploadGalleryImages as uploadGalleryImagesMiddleware } from '../config/cloudinary.js';

const router = express.Router();

router.get('/discovery', protect, getDiscoveryFeed);
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);
router.post('/:id/profile-picture', protect, uploadProfilePictureMiddleware.single('profilePicture'), uploadProfilePicture);
router.post('/:id/gallery', protect, uploadGalleryImagesMiddleware.array('galleryImages', 10), addGalleryImages);
router.delete('/:id/gallery/:imageId', protect, deleteGalleryImage);
router.post('/:id/block/:blockedUserId', protect, blockUser);
router.post('/:id/unblock/:blockedUserId', protect, unblockUser);
router.post('/:id/report/:reportedUserId', protect, reportUser);

export default router;
