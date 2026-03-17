import express from 'express';
import {
  likeUser,
  unlikeUser,
  getMatches,
  getLikesReceived,
  getLikesSent,
  acceptMatch,
  rejectMatch,
} from '../controllers/matchController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/like/:userId', protect, likeUser);
router.delete('/unlike/:userId', protect, unlikeUser);
router.get('/', protect, getMatches);
router.get('/likes/received', protect, getLikesReceived);
router.get('/likes/sent', protect, getLikesSent);
router.put('/:matchId/accept', protect, acceptMatch);
router.put('/:matchId/reject', protect, rejectMatch);

export default router;
