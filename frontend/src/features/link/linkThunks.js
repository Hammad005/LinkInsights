import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLink, deleteLink, getLinkAnalytics, getMyClicks, getMyLinks } from "./linkServices";
import toast from "react-hot-toast";

export const createLinkThunk = createAsyncThunk(
  "link/create",
  async (data, thunkAPI) => {
    try {
      const res = await createLink(data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getLinkAnalyticsThunk = createAsyncThunk(
  "link/getAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await getLinkAnalytics();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMyLinksThunk = createAsyncThunk(
  "link/getMyLinks",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await getMyLinks(page, limit);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMyClicksThunk = createAsyncThunk(
  "link/getMyClicks",
  async ({ data, page, limit }, thunkAPI) => {
    try {
      const res = await getMyClicks(data, page, limit);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteLinkThunk = createAsyncThunk(
  "link/deleteLink",
  async (id, thunkAPI) => {
    try {
      const res = await deleteLink(id);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);