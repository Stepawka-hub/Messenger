import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProfileAsync,
  getProfileStatusAsync,
  updateProfileAsync,
  updateProfilePhotoAsync,
} from "@thunks/profile";
import { TPhotos, TProfile } from "src/types";
import { TProfileState } from "./types";

const initialState: TProfileState = {
  profile: null,
  status: "Нет",
  isLoadingProfile: false,
  isUpdatingProfile: false,
  isUpdatingPhoto: false,
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
    getIsLoadingProfile: (state) => state.isLoadingProfile,
    getIsUpdatingProfile: (state) => state.isUpdatingProfile,
    getIsUpdatingPhoto: (state) => state.isUpdatingPhoto,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePhotoAsync.pending, (state) => {
        state.isUpdatingPhoto = true;
      })
      .addCase(
        updateProfilePhotoAsync.fulfilled,
        (state, { payload }: PayloadAction<TPhotos>) => {
          state.isUpdatingPhoto = false;
          if (state.profile) {
            state.profile.photos = payload;
          }
        }
      )
      .addCase(updateProfilePhotoAsync.rejected, (state) => {
        state.isUpdatingPhoto = false;
      })

      .addCase(updateProfileAsync.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state) => {
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.isUpdatingProfile = false;
      })

      .addCase(getProfileAsync.pending, (state) => {
        state.profile = null;
        state.isLoadingProfile = true;
      })
      .addCase(
        getProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<TProfile>) => {
          state.profile = payload;
          state.isLoadingProfile = false;
        }
      )
      .addCase(getProfileAsync.rejected, (state) => {
        state.isLoadingProfile = false;
      })

      .addCase(
        getProfileStatusAsync.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.status = payload;
        }
      );
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
