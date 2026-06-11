import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUser, forgotPassword, loginUser, me, registerUser, resendOTP, resetPassword, sendOTP, updatePP, updateUD, verifiyOTP } from "./authServices";
import toast from "react-hot-toast";


export const getMe = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
                const res = await me();
                return res.data;
        } catch (error) {
                return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
        const res = await registerUser(data);
        localStorage.setItem('Bearer-Token', res.data.token);
        toast.success('Signup successful');
        return res.data;
    } catch (error) {
        toast.error(error.response.data.error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await loginUser(data);
            localStorage.setItem('Bearer-Token', res.data.token);
            toast.success('Login successful');
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem('Bearer-Token');
            toast.success('Logout successful');
            return;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sendForgotPasswordOTP = createAsyncThunk(
    "auth/sendForgotPasswordOTP",
    async (data, thunkAPI) => {
        try {
            const res = await sendOTP(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const verifyForgotPasswordOTP = createAsyncThunk(
    "auth/verifyForgotPasswordOTP",
    async (data, thunkAPI) => {
        try {
            const res = await verifiyOTP(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);


export const resendForgotPasswordOTP = createAsyncThunk(
    "auth/resendForgotPasswordOTP",
    async (data, thunkAPI) => {
        try {
            const res = await resendOTP(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const forgotMyPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data, thunkAPI) => {
        try {
            const res = await forgotPassword(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const updateProfilePic = createAsyncThunk(
    "auth/updateProfilePic",
    async (data, thunkAPI) => {
        try {
            const res = await updatePP(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const updateUserData = createAsyncThunk(
    "auth/updateUserData",
    async (data, thunkAPI) => {
        try {
            const res = await updateUD(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const resetMyPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, thunkAPI) => {
        try {
            const res = await resetPassword(data);
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const deleteMyAccount = createAsyncThunk(
    "auth/deleteUser",
    async (_, thunkAPI) => {
        try {
            const res = await deleteUser();
            toast.success(res.data.message);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
)