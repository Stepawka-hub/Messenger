import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { followUnfollowFlow, getUsersAsync } from "@thunks/users";
import { TSocialUser, TUserFilter } from "@types";
import { TGetItemsDataResponse } from "@utils/api/types";
import {
  removeFromArray,
  updateObjectInArray,
} from "@utils/helpers";
import { TUsersState } from "./types";

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
      })

      .addCase(followUnfollowFlow.pending, (state, { meta }) => {
        state.followingInProgressIds.push(meta.arg.userId);
      })
      .addCase(followUnfollowFlow.fulfilled, (state, { payload, meta }) => {
        const userId = meta.arg.userId;

        state.followingInProgressIds = removeFromArray(
          state.followingInProgressIds,
          userId
        );

        state.users = updateObjectInArray(state.users, userId, "id", {
          followed: payload,
        });
      })
      .addCase(followUnfollowFlow.rejected, (state, { meta }) => {
        state.followingInProgressIds = removeFromArray(
          state.followingInProgressIds,
          meta.arg.userId
        );
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
export const { setCurrentPage, setSearchQuery, setFilter } = usersSlice.actions;
