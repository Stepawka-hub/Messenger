import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFollowed, setFollowingProgress } from "@slices/users";
import { SUCCESS_CODE, usersAPI } from "@utils/api/api";
import { TGetUsersData, TResponse } from "@utils/api/types";
import { TPagination, TUserId } from "src/types";
import { ThunkAppDispatch } from "./types";

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

export const followToUserAsync = createAsyncThunk<void, TUserId>(
  FOLLOW_USER,
  async (userId, { dispatch }) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, true);
  }
);
export const unfollowFromUserAsync = createAsyncThunk<void, TUserId>(
  UNFOLLOW_USER,
  async (userId, { dispatch }) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, false);
  }
);

const followUnfollowFlow = async (
  dispatch: ThunkAppDispatch,
  userid: number,
  apiMethod: (userid: TUserId) => Promise<TResponse>,
  status: boolean
) => {
  dispatch(setFollowingProgress({ followingInProgress: true, userid }));

  const data = await apiMethod(userid);
  if (data.resultCode === SUCCESS_CODE) {
    dispatch(setFollowed({ userid, status }));
  }

  dispatch(setFollowingProgress({ followingInProgress: false, userid }));
};
