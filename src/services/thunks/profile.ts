import { profileAPI, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { TPhotos, TProfile } from "src/types";

const GET_PROFILE = "profile/get";
const UPDATE_PROFILE = "profile/update";
const GET_STATUS = "profile/get-status";
const UPDATE_STATUS = "profile/update-status";
const UPDATE_PHOTO = "profile/update-photo";

export const getProfileAsync = createAsyncThunk<TProfile, number>(
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

export const getProfileStatusAsync = createAsyncThunk<string, number>(
  GET_STATUS,
  async (userId, { rejectWithValue }) => {
    try {
      const status = await profileAPI.getUserStatus(userId);
      return status;
    } catch (err) {
      return rejectWithValue(err || "Failed to get status");
    }
  }
);

export const updateProfileStatusAsync = createAsyncThunk<string, string>(
  UPDATE_STATUS,
  async (status, { rejectWithValue }) => {
    const { resultCode, messages } = await profileAPI.updateUserStatus(status);
    if (resultCode === SUCCESS_CODE) {
      return status;
    }

    return rejectWithValue(messages[0] || "Failed to update profile status");
  }
);

export const updateProfilePhotoAsync = createAsyncThunk<TPhotos, File>(
  UPDATE_PHOTO,
  async (photo, { rejectWithValue }) => {
    const { data, messages, resultCode } = await profileAPI.updatePhoto(photo);
    if (resultCode === SUCCESS_CODE) {
      return data.photos;
    }

    return rejectWithValue(messages[0] || "Failed to update profile photo");
  }
);

export const updateProfileAsync = createAsyncThunk<void, TProfile>(
  UPDATE_PROFILE,
  async (profileData, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;

    const { messages, resultCode } = await profileAPI.updateProfile(
      profileData
    );

    if (resultCode === SUCCESS_CODE && userId) {
      dispatch(getProfileAsync(userId));
      return;
    }

    return rejectWithValue(messages[0] || "Failed to update profile");
  }
);
