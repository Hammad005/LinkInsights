import express from 'express';
import { createLink } from '../controllers/linkController.js';

const router = express.Router();

router.post('/create', createLink);

export default router;