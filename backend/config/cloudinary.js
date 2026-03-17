import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for profile pictures and gallery images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'amora/profiles',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

// Storage for chat images
const chatImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'amora/chats',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

// Multer instances
export const uploadProfilePicture = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

export const uploadGalleryImages = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

export const uploadChatImage = multer({
  storage: chatImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

export default cloudinary;
