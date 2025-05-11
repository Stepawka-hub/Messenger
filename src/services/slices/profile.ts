import avatarBlack from "@images/black.png";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersAsync } from "@thunks/users";
import { TGetUsersData } from "@utils/api/types";
import { TProfileState } from "./types";
import { mockPosts } from '@utils/mock';

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
    
        case ADD_POST: {
          return addPost(state, action.newPostText);
        }
    
        case DELETE_POST: {
          return deletePost(state, action.postid);
        }
    
        case SET_USER_PROFILE: {
          return setUserProfile(state, action.profile);
        }
    
        case SET_USER_STATUS: {
          return setUserStatus(state, action.status);
        }
    
        case SET_USER_PHOTO: {
          return setUserPhoto(state, action.photos);
        }
    
        case TOGGLE_IS_UPDATING_PHOTO: {
          return setIsUpdatingPhoto(state, action.isUpdate);
        }
  },
  selectors: {
    getPosts: (state) => state.posts,
    getProfileSelector: (state) => state.profile,
    getStatusSelector: (state) => state.status,
    getIsUpdatingPhoto: (state) => state.isUpdatingPhoto,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsersAsync.fulfilled,
        (state, { payload }: PayloadAction<TGetUsersData>) => {
          state.isLoading = false;
          state.totalUsersCount = payload.totalCount;
          state.users = payload.items;
        }
      )
      .addCase(getUsersAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const reducer = profileSlice.reducer;
export const {
  getUserList,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsLoading,
  getFollowingInProgress,
} = profileSlice.selectors;
