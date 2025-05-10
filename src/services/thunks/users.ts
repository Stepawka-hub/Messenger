import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "@utils/api/api";
import { followAC, setFollowingProgressAC, unfollowAC } from "./actions";
import { TGetUsersData } from "@utils/api/types";
import { TPagination } from "src/types";

const GET_USERS = "users/getAll";
const FOLLOW_USER = "users/follow";
const UNFOLLOW_USER = "users/unfollow";

export const getUsersAsync = createAsyncThunk<TGetUsersData, TPagination>(
  GET_USERS,
  async ({ currentPage, pageSize }) => {
    const { items, totalCount } = await usersAPI.getUsers(
      currentPage,
      pageSize
    );
    const users = items.map((u) => ({
      ...u,
      location: { country: "Russia", city: "Moscow" },
    }));

    return { items: users, totalCount };
  }
);

export const followToUser = createAsyncThunk<void, number>(
  FOLLOW_USER,
  async (userId, { dispatch }) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, followAC);
  }
);
export const unfollowFromUser = createAsyncThunk<void, number>(
  UNFOLLOW_USER,
  async (userId, { dispatch }) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollowAC);
  }
);

const followUnfollowFlow = async (
  dispatch,
  userId: number,
  apiMethod,
  actionCreator
) => {
  dispatch(setFollowingProgressAC(true, userId));

  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }

  dispatch(setFollowingProgressAC(false, userId));
};
