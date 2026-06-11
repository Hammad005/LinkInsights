import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { jwtSign } from "../func/jwtSign.js";
import cloudinary from "../lib/cloudinary.js";
import streamifier from "streamifier";
import otpGenerator from "../func/otpGenerator.js";
import sendEmail from "../lib/nodemailer.js";
import { forgotPasswordOtpEmailTemplate } from "../utils/emailTemplates.js";
import Click from "../models/Click.js";
import Link from "../models/Link.js";

export const Me = async (req, res) => {
  try {
    const user = req.user;
    const deletePasswordFromUser = { ...user._doc };
    delete deletePasswordFromUser.password;
    return res.status(200).json({ user: deletePasswordFromUser });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: error.message || "Failed to get user" });
  }
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    jwtSign(user, res, "7d");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    jwtSign(user, res, "7d");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message || "Failed to log in" });
  }
};

export const Logout = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        message: "Logged out successfully",
        user: null,
        accessToken: null,
      });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: error.message || "Failed to log out" });
  }
};

export const SendForgetPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with this email" });
    }

    const otp = otpGenerator();
    const mailOptions = {
      email,
      subject: "LinkInsights - Forget Password Code",
      html: forgotPasswordOtpEmailTemplate(otp, 5),
    };

    const hasedOtp = await bcrypt.hash(otp, 10);
    user.forgotPasswordOTP = hasedOtp;
    user.forgotPasswordOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    await user.save();
    await sendEmail(mailOptions);

    return res.status(200).json({ message: `OTP sent successfully to ${email}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
};

export const VerifiyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with this email" });
    }

    if (
      !user.forgotPasswordOTPExpiry ||
      user.forgotPasswordOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ error: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, user.forgotPasswordOTP);
    if (!isOtpValid) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    user.forgotPasswordOTPVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: error.message || "Failed to verify OTP" });
  }
};

export const ResendForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with this email" });
    }

    const now = new Date();

    if (
      user.forgotPasswordOTPExpiry &&
      user.forgotPasswordOTPExpiry > now - 60 * 1000
    ) {
      return res
        .status(400)
        .json({ error: "Please wait before resending another OTP" });
    };

    const otp = otpGenerator();
    const mailOptions = {
      email,
      subject: "LinkInsights - Forget Password Code",
      html: forgotPasswordOtpEmailTemplate(otp, 5),
    };

    const hasedOtp = await bcrypt.hash(otp, 10);
    user.forgotPasswordOTP = hasedOtp;
    user.forgotPasswordOTPExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();
    await sendEmail(mailOptions);

    return res.status(200).json({ message: `OTP resent successfully to ${email}` });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with this email" });
    }

    if (!user.forgotPasswordOTPVerified) {
      return res.status(400).json({ error: "OTP not verified" });
    };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordOTP = null;
    user.forgotPasswordOTPExpiry = null;
    user.forgotPasswordOTPVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: error.message || "Failed to reset password" });
  }
};

export const UpdateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Profile pic uploaded" });
    }

    const user = req.user;

    // 🔥 wrap upload_stream in a Promise
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "LinkInsights/profile-pics",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // delete old image AFTER successful upload
    if (user?.profileImage?.profileId) {
      await cloudinary.uploader.destroy(user.profileImage.profileId);
    }

    // update user
    user.profileImage = {
      profileId: uploadResult.public_id,
      profileUrl: uploadResult.secure_url,
    };

    await user.save();

    return res.status(200).json({
      message: "Profile pic updated successfully",
      newProfilePic: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error updating profile pic:", error);
    return res.status(500).json({
      error: error.message || "Failed to upload profile pic",
    });
  }
};

export const UpdateUserData = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = req.user;
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    await user.save();
    return res
      .status(200)
      .json({
        message: "Profile updated successfully",
        userData: { name: user.name, email: user.email },
      });
  } catch (error) {
    console.error("Error updating user data:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update user data" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    } else if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = req.user;

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Old Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to reset password" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const user = req.user;

    const links = await Link.find({ createdBy: user._id });

    const shortCodes = links.map((link) => link.shortCode);

    await Click.deleteMany({
      linkId: { $in: shortCodes },
    });

    await Link.deleteMany({
      createdBy: user._id,
    });

    await User.findByIdAndDelete(user._id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
};
