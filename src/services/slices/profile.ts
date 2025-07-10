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
    isGettingProfile: false,
    isUpdatingProfile: false,
    isUpdatingPhoto: false,
    isUpdatingStatus: false,
  },
  errors: {
    fetchProfileError: null,
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
    getIsLoadingProfile: (state) => state.loading.isGettingProfile,
    getIsUpdatingProfile: (state) => state.loading.isUpdatingProfile,
    getIsUpdatingPhoto: (state) => state.loading.isUpdatingPhoto,
    getIsUpdatingStatus: (state) => state.loading.isUpdatingStatus,
    getFetchProfileError: (state) => state.errors.fetchProfileError
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.pending, (state) => {
        state.profile = null;
        state.loading.isGettingProfile = true;
        state.errors.fetchProfileError = null;
      })
      .addCase(
        getProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<TProfileWithStatus>) => {
          state.profile = payload.profile;
          state.status = payload.status;
          state.loading.isGettingProfile = false;
        }
      )
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.loading.isGettingProfile = false;
        state.errors.fetchProfileError =
          action.payload?.message || "Произошла неизвестная ошибка!";
      })

      .addCase(updateProfilePhotoAsync.pending, (state) => {
        state.loading.isUpdatingPhoto = true;
      })
      .addCase(
        updateProfilePhotoAsync.fulfilled,
        (state, { payload }: PayloadAction<TPhotos>) => {
          state.loading.isUpdatingPhoto = false;
          if (state.profile) {
            state.profile.photos = payload;
          }
        }
      )
      .addCase(updateProfilePhotoAsync.rejected, (state) => {
        state.loading.isUpdatingPhoto = false;
      })

      .addCase(updateProfileAsync.pending, (state) => {
        state.loading.isUpdatingProfile = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state) => {
        state.loading.isUpdatingProfile = false;
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.loading.isUpdatingProfile = false;
      })

      .addCase(updateProfileStatusAsync.pending, (state) => {
        state.loading.isUpdatingStatus = true;
      })
      .addCase(
        updateProfileStatusAsync.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.loading.isUpdatingStatus = false;
          state.status = payload;
        }
      )
      .addCase(updateProfileStatusAsync.rejected, (state) => {
        state.loading.isUpdatingStatus = false;
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
  getIsUpdatingStatus,
  getFetchProfileError
} = profileSlice.selectors;
export const { setProfile, setProfilePhoto, setProfileStatus } =
  profileSlice.actions;
