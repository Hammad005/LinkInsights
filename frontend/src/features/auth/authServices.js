import axios from "../../services/axios";

// Get Requests
export const me = async () => axios.get("/auth/me");


// Post Requests
export const registerUser = async (data) => axios.post("/auth/signup", data);
export const loginUser = async (data) => axios.post("/auth/login", data);
export const sendOTP = async (data) => axios.post("/auth/sendForgetPasswordOTP", data);
export const verifiyOTP = async (data) => axios.post("/auth/verifiyForgotPasswordOTP", data);
export const resendOTP = async (data) => axios.post("/auth/resendForgotPasswordOTP", data);
export const forgotPassword = async (data) => axios.post("/auth/forgotPassword", data);


// Put Requests
export const updatePP = async (data) => axios.put("/auth/updateProfilePic", data);
export const updateUD = async (data) => axios.put("/auth/updateUserData", data);
export const resetPassword = async (data) => axios.put("/auth/resetPassword", data);


// Delete Requests
export const deleteUser = async () => axios.delete("/auth/deleteUser");