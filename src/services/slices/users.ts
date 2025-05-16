import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersAsync } from "@thunks/users";
import { TGetUsersData } from "@utils/api/types";
import {
  TSetFollowePayload,
  TSetIsFollowingPayload,
  TUsersState,
} from "./types";
import { updateObjectInArray } from "@utils/helpers/objectHelpers";
import { TUser } from "src/types";

const initialState: TUsersState = {
  users: [],
  pageSize: 4,
  currentPage: 1,
  totalUsersCount: 1,
  isLoading: false,
  followingInProgress: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFollowed: (state, { payload }: PayloadAction<TSetFollowePayload>) => {
      const { userid, status } = payload;
      state.users = updateObjectInArray<TUser, { followed: boolean }>(
        state.users,
        userid,
        "id",
        { followed: status }
      );
    },
    setFollowingProgress: (
      state,
      { payload }: PayloadAction<TSetIsFollowingPayload>
    ) => {
      const { userid, followingInProgress } = payload;

      state.followingInProgress = followingInProgress
        ? [...state.followingInProgress, userid]
        : state.followingInProgress.filter((id) => id !== userid);
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
  },
  selectors: {
    getUserList: (state) => state.users,
    getPageSize: (state) => state.pageSize,
    getTotalUsersCount: (state) => state.totalUsersCount,
    getCurrentPage: (state) => state.currentPage,
    getIsLoading: (state) => state.isLoading,
    getFollowingInProgress: (state) => state.followingInProgress,
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

export const reducer = usersSlice.reducer;
export const {
  getUserList,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsLoading,
  getFollowingInProgress,
} = usersSlice.selectors;
export const { setFollowed, setFollowingProgress, setCurrentPage } =
  usersSlice.actions;
