import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProfileAsync,
  updateProfileAsync,
  updateProfilePhotoAsync,
  updateProfileStatusAsync,
} from "@thunks/profile";
import { TPhotos, TProfile } from "src/types";
import { TProfileState } from "./types";
import { TProfileWithStatus } from "../types";

const initialState: TProfileState = {
  profile: null,
  status: "Нет",
  loading: {
    isGetProfile: false,
    isUpdateProfile: false,
    isUpdatePhoto: false,
    isUpdateStatus: false,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<TProfile | null>) => {
      state.profile = payload;
    },
    setProfileStatus: (state, { payload }: PayloadAction<string>) => {
      state.status = payload;
    },
    setProfilePhoto: (state, { payload }: PayloadAction<TPhotos>) => {
      if (state.profile) {
        state.profile.photos = payload;
      }
    },
  },
  selectors: {
    getProfile: (state) => state.profile,
    getProfileStatus: (state) => state.status,
    getIsLoadingProfile: (state) => state.loading.isGetProfile,
    getIsUpdatingProfile: (state) => state.loading.isUpdateProfile,
    getIsUpdatingPhoto: (state) => state.loading.isUpdatePhoto,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.pending, (state) => {
        state.profile = null;
        state.loading.isGetProfile = true;
      })
      .addCase(
        getProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<TProfileWithStatus>) => {
          state.profile = payload.profile;
          state.status = payload.status;
          state.loading.isGetProfile = false;
        }
      )
      .addCase(getProfileAsync.rejected, (state) => {
        state.loading.isGetProfile = false;
      })

      .addCase(updateProfilePhotoAsync.pending, (state) => {
        state.loading.isUpdatePhoto = true;
      })
      .addCase(
        updateProfilePhotoAsync.fulfilled,
        (state, { payload }: PayloadAction<TPhotos>) => {
          state.loading.isUpdatePhoto = false;
          if (state.profile) {
            state.profile.photos = payload;
          }
        }
      )
      .addCase(updateProfilePhotoAsync.rejected, (state) => {
        state.loading.isUpdatePhoto = false;
      })

      .addCase(updateProfileAsync.pending, (state) => {
        state.loading.isUpdateProfile = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state) => {
        state.loading.isUpdateProfile = false;
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.loading.isUpdateProfile = false;
      })

      .addCase(updateProfileStatusAsync.pending, (state) => {
        state.loading.isUpdateStatus = true;
      })
      .addCase(
        updateProfileStatusAsync.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.loading.isUpdateStatus = false;
          state.status = payload;
        }
      )
      .addCase(updateProfileStatusAsync.rejected, (state) => {
        state.loading.isUpdateStatus = false;
      });
  },
});

export const reducer = profileSlice.reducer;
export const {
  getProfile,
  getProfileStatus,
  getIsLoadingProfile,
  getIsUpdatingProfile,
  getIsUpdatingPhoto,
} = profileSlice.selectors;
export const { setProfile, setProfilePhoto, setProfileStatus } =
  profileSlice.actions;
