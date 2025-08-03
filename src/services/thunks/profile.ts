import { API_CODES } from "@api/constants";
import { profileAPI } from "@api/profile.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { createErrorPayload } from "@utils/helpers";
import { TPhotos, TProfile, TUserId } from "@types";
import { TProfileWithStatus } from "../types";
import { TBaseRejectValue } from "./types";
import { setUserLogin, setUserPhoto } from "@slices/auth";
import { setProfile } from "@slices/profile";

const GET_PROFILE = "profile/get-profile";
const UPDATE_PROFILE = "profile/update-profile";
const UPDATE_STATUS = "profile/update-status";
const UPDATE_PHOTO = "profile/update-photo";

export const getProfileAsync = createAsyncThunk<
  TProfileWithStatus,
  TUserId,
  TBaseRejectValue
>(GET_PROFILE, async (userId, { rejectWithValue }) => {
  try {
    const getProfilePromise = profileAPI.getProfile(userId);
    const getStatusPromise = profileAPI.getUserStatus(userId);

    const [profile, status] = await Promise.all([
      getProfilePromise,
      getStatusPromise,
    ]);

    return { profile, status };
  } catch (err) {
    console.error("Error fetching profile:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const updateProfileStatusAsync = createAsyncThunk<
  string,
  string,
  TBaseRejectValue
>(UPDATE_STATUS, async (status, { rejectWithValue }) => {
  try {
    const { resultCode, messages } = await profileAPI.updateUserStatus(status);
    if (resultCode === API_CODES.SUCCESS) {
      return status;
    }

    return rejectWithValue(
      createErrorPayload({
        message: messages[0] || "Не удалось обновить статус профиля",
      })
    );
  } catch (err) {
    console.error("Error updating profile status:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const updateProfilePhotoAsync = createAsyncThunk<
  TPhotos,
  File,
  TBaseRejectValue
>(UPDATE_PHOTO, async (photo, { dispatch, rejectWithValue }) => {
  try {
    const { data, messages, resultCode } = await profileAPI.updatePhoto(photo);
    if (resultCode === API_CODES.SUCCESS) {
      dispatch(setUserPhoto(data.photos));
      return data.photos;
    }

    return rejectWithValue(
      createErrorPayload({
        message: messages[0] || "Не удалось обновить фотографию профиля",
      })
    );
  } catch (err) {
    console.error("Error updating profile photo:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const updateProfileAsync = createAsyncThunk<
  void,
  TProfile,
  TBaseRejectValue
>(
  UPDATE_PROFILE,
  async (profileData, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      const { messages, resultCode } = await profileAPI.updateProfile(
        profileData
      );

      if (resultCode === API_CODES.SUCCESS && userId) {
        dispatch(setUserLogin(profileData.fullName));
        dispatch(setProfile(profileData));
        return;
      }

      return rejectWithValue(
        createErrorPayload({
          message: messages[0] || "Не удалось обновить профиль",
        })
      );
    } catch (err) {
      console.error("Error updating profile:", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);
