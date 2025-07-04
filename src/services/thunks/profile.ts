import { API_CODES } from "@api/constants";
import { profileAPI } from "@api/profile.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { TErrorPayload, TPhotos, TProfile, TUserId } from "src/types";
import { TProfileWithStatus } from "../types";
import { getErrorMessage } from "@utils/helpers/error-helpers";

const GET_PROFILE = "profile/get";
const UPDATE_PROFILE = "profile/update";
const UPDATE_STATUS = "profile/update-status";
const UPDATE_PHOTO = "profile/update-photo";

export const getProfileAsync = createAsyncThunk<TProfileWithStatus, TUserId>(
  GET_PROFILE,
  async (userId, { rejectWithValue }) => {
    try {
      const getProfilePromise = profileAPI.getProfile(userId);
      const getStatusPromise = profileAPI.getUserStatus(userId);

      const [profile, status] = await Promise.all([
        getProfilePromise,
        getStatusPromise,
      ]);

      return { profile, status };
    } catch (err) {
      const error: TErrorPayload = {
        type: "TOAST",
        message: getErrorMessage(err) || "Failed to get profile",
      };
      return rejectWithValue(error);
    }
  }
);

export const updateProfileStatusAsync = createAsyncThunk<string, string>(
  UPDATE_STATUS,
  async (status, { rejectWithValue }) => {
    const { resultCode, messages } = await profileAPI.updateUserStatus(status);
    if (resultCode === API_CODES.SUCCESS) {
      return status;
    }

    return rejectWithValue(messages[0] || "Failed to update profile status");
  }
);

export const updateProfilePhotoAsync = createAsyncThunk<TPhotos, File>(
  UPDATE_PHOTO,
  async (photo, { rejectWithValue }) => {
    const { data, messages, resultCode } = await profileAPI.updatePhoto(photo);
    if (resultCode === API_CODES.SUCCESS) {
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

    if (resultCode === API_CODES.SUCCESS && userId) {
      dispatch(getProfileAsync(userId));
      return;
    }

    return rejectWithValue(messages[0] || "Failed to update profile");
  }
);
