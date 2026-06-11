import express from 'express';
import { analytics, createLink, deleteLink, getMyClicks, getMyLinks } from '../controllers/linkController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createLink);

router.get('/analytics', authMiddleware, analytics);

router.get('/getMyLinks', authMiddleware, getMyLinks);

router.get('/getMyClicks', authMiddleware, getMyClicks);

router.delete('/deleteLink/:id', authMiddleware, deleteLink);

export default router;