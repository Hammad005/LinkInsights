import express from 'express';
import { Login, Logout, Me, ResetPassword, SendForgetPasswordOTP, Signup, UpdateProfilePic, UpdateUserData } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multerUploadMiddleware from '../middleware/multerUploadMiddleware.js';

const router = express.Router();

// All Get Requests
router.get('/me', authMiddleware, Me);

// All Post Requests
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/sendForgetPasswordOTP', SendForgetPasswordOTP);


// All Put Requests
router.put('/updateProfilePic', authMiddleware, multerUploadMiddleware.single('profilePic'), UpdateProfilePic);
router.put('/updateUserData', authMiddleware, UpdateUserData);
router.put('/resetPassword', authMiddleware, ResetPassword);


export default router;