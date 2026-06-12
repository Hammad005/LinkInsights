import { createSlice } from "@reduxjs/toolkit";
import { deleteMyAccount, forgotMyPassword, getMe, login, logout, resendForgotPasswordOTP, resetMyPassword, sendForgotPasswordOTP, signup, updateProfilePic, updateUserData, verifyForgotPasswordOTP } from "./authThunks";

const initialState = {
    user: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isSendingOTP: false,
    isVerifyingOTP: false,
    isResendingOTP: false,
    isForgatingPassword: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isDeletingAccount: false,
    error: null,
    message: null
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Check Auth
        builder.addCase(getMe.pending, (state) => {
            state.isCheckingAuth = true;
        })
        .addCase(getMe.fulfilled, (state, action) => {
            state.isCheckingAuth = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(getMe.rejected, (state) => {
            state.isCheckingAuth = false;
            state.user = null;
        })


        // Signup
        .addCase(signup.pending, (state) => {
            state.isSigningUp = true;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isSigningUp = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(signup.rejected, (state) => {
            state.isSigningUp = false;
            state.user = null;
        })

        // Login
        .addCase(login.pending, (state) => {
            state.isLoggingIn = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggingIn = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state) => {
            state.isLoggingIn = false;
            state.user = null;
        })

        // Logout
        .addCase(logout.pending, (state) => {
            state.isLoggingOut = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoggingOut = false;
            state.user = null;
            state.isAuthenticated = false;

        })
        .addCase(logout.rejected, (state) => {
            state.isLoggingOut = false;
            state.user = null;
        })

        // Send OTP
        .addCase(sendForgotPasswordOTP.pending, (state) => {
            state.isSendingOTP = true;
        })
        .addCase(sendForgotPasswordOTP.fulfilled, (state, action) => {
            state.isSendingOTP = false;
            state.message = action.payload.message;
        })
        .addCase(sendForgotPasswordOTP.rejected, (state) => {
            state.isSendingOTP = false;
            state.message = null;
        })

        // Verify OTP
        .addCase(verifyForgotPasswordOTP.pending, (state) => {
            state.isVerifyingOTP = true;
        })
        .addCase(verifyForgotPasswordOTP.fulfilled, (state, action) => {
            state.isVerifyingOTP = false;
            state.message = action.payload.message;
        })
        .addCase(verifyForgotPasswordOTP.rejected, (state) => {
            state.isVerifyingOTP = false;
            state.message = null;
        })

        // Resend OTP
        .addCase(resendForgotPasswordOTP.pending, (state) => {
            state.isResendingOTP = true;
        })
        .addCase(resendForgotPasswordOTP.fulfilled, (state, action) => {
            state.isResendingOTP = false;
            state.message = action.payload.message;
        })
        .addCase(resendForgotPasswordOTP.rejected, (state) => {
            state.isResendingOTP = false;
            state.message = null;
        })

        // Forgot Password
        .addCase(forgotMyPassword.pending, (state) => {
            state.isForgatingPassword = true;
        })
        .addCase(forgotMyPassword.fulfilled, (state, action) => {
            state.isForgatingPassword = false;
            state.message = action.payload.message;
        })
        .addCase(forgotMyPassword.rejected, (state) => {
            state.isForgatingPassword = false;
            state.message = null;
        })

        // Update Profile
        .addCase(updateProfilePic.pending, (state) => {
            state.isUpdatingProfile = true;
        })
        .addCase(updateProfilePic.fulfilled, (state, action) => {
            state.isUpdatingProfile = false;
            state.message = action.payload.message;
        })
        .addCase(updateProfilePic.rejected, (state) => {
            state.isUpdatingProfile = false;
            state.message = null;
        })

        // Update User Data
        .addCase(updateUserData.pending, (state) => {
            state.isUpdatingProfile = true;
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            state.isUpdatingProfile = false;
            state.message = action.payload.message;
        })
        .addCase(updateUserData.rejected, (state) => {
            state.isUpdatingProfile = false;
            state.message = null;
        })

        // Reset Password
        .addCase(resetMyPassword.pending, (state) => {
            state.isUpdatingPassword = true;
        })
        .addCase(resetMyPassword.fulfilled, (state, action) => {
            state.isUpdatingPassword = false;
            state.message = action.payload.message;
        })
        .addCase(resetMyPassword.rejected, (state) => {
            state.isUpdatingPassword = false;
            state.message = null;
        })

        // Delete Account
        .addCase(deleteMyAccount.pending, (state) => {
            state.isDeletingAccount = true;
        })
        .addCase(deleteMyAccount.fulfilled, (state, action) => {
            state.isDeletingAccount = false;
            state.message = action.payload.message;
        })
        .addCase(deleteMyAccount.rejected, (state) => {
            state.isDeletingAccount = false;
            state.message = null;
        })

    }
});

export default authSlice.reducer;