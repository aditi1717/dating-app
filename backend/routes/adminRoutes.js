import express from 'express';
import { adminRegister, adminLogin, adminLogout, getCurrentAdmin } from '../controllers/adminAuthController.js';
import { banUser, getModerationUsers, unbanUser } from '../controllers/adminController.js';
import { adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/logout', adminProtect, adminLogout);
router.get('/me', adminProtect, getCurrentAdmin);
router.get('/users', adminProtect, getModerationUsers);
router.patch('/users/:id/ban', adminProtect, banUser);
router.patch('/users/:id/unban', adminProtect, unbanUser);

export default router;
