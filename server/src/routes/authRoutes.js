import express from 'express';
import { DeleteUser, ForgotPassword, googleLogin, Login, Logout, Me, ResendForgotPasswordOTP, ResetPassword, SendForgetPasswordOTP, Signup, UpdateProfilePic, UpdateUserData, VerifiyForgotPasswordOTP } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import multerUploadMiddleware from '../middleware/multerUploadMiddleware.js';

const router = express.Router();

// All Get Requests
router.get('/me', authMiddleware, Me);

// All Post Requests
router.post('/google', googleLogin);
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/sendForgetPasswordOTP', SendForgetPasswordOTP);
router.post('/verifiyForgotPasswordOTP', VerifiyForgotPasswordOTP);
router.post('/resendForgotPasswordOTP', ResendForgotPasswordOTP);
router.post('/forgotPassword', ForgotPassword);


// All Put Requests
router.put('/updateProfilePic', authMiddleware, multerUploadMiddleware.single('profilePic'), UpdateProfilePic);
router.put('/updateUserData', authMiddleware, UpdateUserData);
router.put('/resetPassword', authMiddleware, ResetPassword);

// Delete Requests
router.delete('/deleteUser', authMiddleware, DeleteUser);

export default router;