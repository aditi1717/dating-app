import express from 'express';
import { adminRegister, adminLogin, adminLogout, getCurrentAdmin } from '../controllers/adminAuthController.js';
import { adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/logout', adminProtect, adminLogout);
router.get('/me', adminProtect, getCurrentAdmin);

export default router;
