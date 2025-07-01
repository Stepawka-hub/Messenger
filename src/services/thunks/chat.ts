import { profileAPI } from "@api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProfile } from "src/types";

const GET_PROFILE = "profile/get";

export const startMessagesListening = createAsyncThunk<TProfile, number>(
  GET_PROFILE,
  async (userId, { rejectWithValue }) => {
    try {
      const profile = await profileAPI.getProfile(userId);
      return profile;
    } catch (err) {
      return rejectWithValue(err || "Failed to get profile");
    }
  }
);