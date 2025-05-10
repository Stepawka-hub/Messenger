import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersAsync } from "@thunks/users";
import { TGetUsersData } from "@utils/api/types";
import { TUsersState } from "./types";
import { updateObjectInArray } from "@utils/helpers/objectHelpers";
import { TUser } from "src/types";

const initialState: TUsersState = {
  users: [],
  totalUsersCount: 1,
  pageSize: 4,
  currentPage: 1,
  isLoading: false,
  followingInProgress: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFollowed: (
      state,
      { payload }: PayloadAction<{ userid: number; status: boolean }>
    ) => {
      const { userid, status } = payload;
      state.users = updateObjectInArray<TUser, { followed: boolean }>(
        state.users,
        userid,
        "id",
        { followed: status }
      );
    },
    setUsers: (state, { payload }: PayloadAction<TUser[]>) => {
      state.users = payload;
    },
    setTotalUsersCount: (state, { payload }: PayloadAction<number>) => {
      state.totalUsersCount = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setFollowingProgress: (
      state,
      {
        payload,
      }: PayloadAction<{
        followingInProgress: boolean;
        userid: number;
      }>
    ) => {
      const { userid, followingInProgress } = payload;

      if (followingInProgress) {
        state.followingInProgress.push(userid);
      } else {
        state.followingInProgress = state.followingInProgress.filter(
          (id) => id !== userid
        );
      }
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
