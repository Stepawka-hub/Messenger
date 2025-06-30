import avatarBlack from "@images/black.png";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProfileAsync,
  getProfileStatusAsync,
  updateProfileAsync,
  updateProfilePhotoAsync,
} from "@thunks/profile";
import { mockPosts } from "@utils/mock";
import { TPhotos, TProfile } from "src/types";
import { TProfileState } from "./types";

const initialState: TProfileState = {
  profile: null,
  status: "Нет",
  isUpdatingProfile: false,
  isUpdatingPhoto: false,
  posts: [...mockPosts],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state, { payload }: PayloadAction<string>) => {
      const post = {
        id: state.posts.length + 1,
        userid: 1,
        message: payload,
        username: "Stepawka",
        avatar: avatarBlack,
      };

      state.posts.push(post);
    },
    deletePost: (state, { payload }: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
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
    getPosts: (state) => state.posts,
    getProfile: (state) => state.profile,
    getProfileStatus: (state) => state.status,
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

      .addCase(
        getProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<TProfile>) => {
          state.profile = payload;
        }
      )

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
  getPosts,
  getProfile,
  getProfileStatus,
  getIsUpdatingProfile,
  getIsUpdatingPhoto,
} = profileSlice.selectors;
export const {
  setProfile,
  setProfilePhoto,
  setProfileStatus,
  addPost,
  deletePost,
} = profileSlice.actions;
