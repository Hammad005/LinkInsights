import express from 'express';
import { analytics, createLink } from '../controllers/linkController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createLink);

router.get('/analytics', authMiddleware, analytics);

export default router;