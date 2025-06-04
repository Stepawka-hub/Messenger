import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersAsync } from "@thunks/users";
import { TGetUsersData } from "@utils/api/types";
import { updateObjectInArray } from "@utils/helpers/array-helpers";
import { TSocialUser } from "src/types";
import {
  TSetFollowedPayload,
  TSetIsFollowingPayload,
  TUsersState,
} from "./types";

const initialState: TUsersState = {
  users: [],
  isLoading: false,
  followingInProgress: [],
  pagination: {
    pageSize: 4,
    currentPage: 1,
    totalUsersCount: 1,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFollowed: (state, { payload }: PayloadAction<TSetFollowedPayload>) => {
      const { userid, status } = payload;
      state.users = updateObjectInArray<TSocialUser, { followed: boolean }>(
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
      state.pagination.currentPage = payload;
    },
  },
  selectors: {
    getUserList: (state) => state.users,
    getPagination: (state) => state.pagination,
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
          state.pagination.totalUsersCount = payload.totalCount;
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
  getPagination,
  getIsLoading,
  getFollowingInProgress,
} = usersSlice.selectors;
export const { setFollowed, setFollowingProgress, setCurrentPage } =
  usersSlice.actions;
