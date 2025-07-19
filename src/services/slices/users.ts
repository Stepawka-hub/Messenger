import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersAsync } from "@thunks/users";
import { TGetItemsDataResponse } from "@utils/api/types";
import { updateObjectInArray } from "@utils/helpers/array-helpers";
import { TSocialUser, TUserFilter } from "@types";
import {
  TSetFollowedPayload,
  TSetIsFollowingPayload,
  TUsersState,
} from "./types";

const initialState: TUsersState = {
  users: [],
  isLoading: false,
  followingInProgressIds: [],
  pagination: {
    pageSize: 6,
    currentPage: 1,
    totalUsersCount: 1,
  },
  searchQuery: "",
  filter: "all",
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
    setFollowingProgressIds: (
      state,
      { payload }: PayloadAction<TSetIsFollowingPayload>
    ) => {
      const { userid, followingInProgress } = payload;

      state.followingInProgressIds = followingInProgress
        ? [...state.followingInProgressIds, userid]
        : state.followingInProgressIds.filter((id) => id !== userid);
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setFilter: (state, { payload }: PayloadAction<TUserFilter>) => {
      state.filter = payload;
    },
  },
  selectors: {
    getUserList: (state) => state.users,
    getPagination: (state) => state.pagination,
    getIsLoading: (state) => state.isLoading,
    getFollowingInProgressIds: (state) => state.followingInProgressIds,
    getSearchQuery: (state) => state.searchQuery,
    getFilter: (state) => state.filter,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.isLoading = true;
        state.pagination.totalUsersCount = 0;
      })
      .addCase(
        getUsersAsync.fulfilled,
        (
          state,
          { payload }: PayloadAction<TGetItemsDataResponse<TSocialUser>>
        ) => {
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
  getFollowingInProgressIds,
  getSearchQuery,
  getFilter,
} = usersSlice.selectors;
export const {
  setFollowed,
  setFollowingProgressIds,
  setCurrentPage,
  setSearchQuery,
  setFilter,
} = usersSlice.actions;
