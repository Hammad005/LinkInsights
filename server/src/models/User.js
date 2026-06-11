import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
    },
    profileImage: {
        profileId: {
            type: String,
        },
        profileUrl: {
            type: String,
        },
    },
    password: {
        type: String,
    },
    forgotPasswordOTP: String,
    forgotPasswordOTPExpiry: Date,
    forgotPasswordOTPVerified: Boolean
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;