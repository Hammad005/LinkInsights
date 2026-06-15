import { createSlice } from "@reduxjs/toolkit";
import {
  createLinkThunk,
  deleteLinkThunk,
  getLinkAnalyticsThunk,
  getMyClicksThunk,
  getMyLinksThunk,
} from "./linkThunks";

const initialState = {
  isGeneratingLink: false,
  isGettingAnalytics: false,
  analytics: [],
  isGettingLinks: false,
  allLinks: [],
  isGettingClicks: false,
  clicks: [],
  isDeletingLink: false,
  error: null,
  message: null,
};

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    // Create Link
    builder
      .addCase(createLinkThunk.pending, (state) => {
        state.isGeneratingLink = true;
      })
      .addCase(createLinkThunk.fulfilled, (state, action) => {
        state.isGeneratingLink = false;
        state.message = action.payload.message;
      })
      .addCase(createLinkThunk.rejected, (state, action) => {
        state.isGeneratingLink = false;
        state.error = action.payload.message;
      })

      // Get Link Analytics
      .addCase(getLinkAnalyticsThunk.pending, (state) => {
        state.isGettingAnalytics = true;
      })
      .addCase(getLinkAnalyticsThunk.fulfilled, (state, action) => {
        state.isGettingAnalytics = false;
        state.analytics = action.payload;
      })
      .addCase(getLinkAnalyticsThunk.rejected, (state, action) => {
        state.isGettingAnalytics = false;
        state.error = action.payload.message;
      })

      //Get My Links
      .addCase(getMyLinksThunk.pending, (state) => {
        state.isGettingLinks = true;
      })
      .addCase(getMyLinksThunk.fulfilled, (state, action) => {
        state.isGettingLinks = false;
        state.allLinks = action.payload;
      })
      .addCase(getMyLinksThunk.rejected, (state, action) => {
        state.isGettingLinks = false;
        state.error = action.payload.message;
      })

      //   Get My Clicks
      .addCase(getMyClicksThunk.pending, (state) => {
        state.isGettingClicks = true;
      })
      .addCase(getMyClicksThunk.fulfilled, (state, action) => {
        state.isGettingClicks = false;
        state.clicks = action.payload.clicks;
      })
      .addCase(getMyClicksThunk.rejected, (state, action) => {
        state.isGettingClicks = false;
        state.error = action.payload.message;
      })

      // Delete Link
      .addCase(deleteLinkThunk.pending, (state) => {
        state.isDeletingLink = true;
      })
      .addCase(deleteLinkThunk.fulfilled, (state, action) => {
        state.isDeletingLink = false;
        state.links = state.links.filter(
          (link) => link._id !== action.payload.linkId,
        );
      })
      .addCase(deleteLinkThunk.rejected, (state, action) => {
        state.isDeletingLink = false;
        state.error = action.payload.message;
      });
  },
});

export default linkSlice.reducer;
