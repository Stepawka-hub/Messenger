import avatarBlack from "@images/black.png";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProfileAsync,
  getUserStatusAsync,
  updateProfilePhotoAsync,
} from "@thunks/profile";
import { mockPosts } from "@utils/mock";
import { TPhotos, TProfile } from "src/types";
import { TProfileState } from "./types";

const initialState: TProfileState = {
  profile: null,
  status: "Нет",
  posts: [...mockPosts],
  isUpdatingPhoto: false,
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
    setProfile: (state, { payload }: PayloadAction<TProfile>) => {
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
    getPostsSeletor: (state) => state.posts,
    getProfileSelector: (state) => state.profile,
    getStatusSelector: (state) => state.status,
    getIsUpdatingPhotoSelector: (state) => state.isUpdatingPhoto,
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

      .addCase(
        getProfileAsync.fulfilled,
        (state, { payload }: PayloadAction<TProfile>) => {
          state.profile = payload;
        }
      )

      .addCase(
        getUserStatusAsync.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.status = payload;
        }
      );
  },
});

export const reducer = profileSlice.reducer;
export const {
  getPostsSeletor,
  getProfileSelector,
  getStatusSelector,
  getIsUpdatingPhotoSelector,
} = profileSlice.selectors;
export const {
  setProfile,
  setProfilePhoto,
  setProfileStatus,
  addPost,
  deletePost,
} = profileSlice.actions;
