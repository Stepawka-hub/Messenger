import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFollowed, setFollowingProgress } from "@slices/users";
import { TUserId } from "@types";
import { API_CODES, usersAPI } from "@utils/api/api";
import { TGetUsersData, TGetUsersPayload, TResponse } from "@utils/api/types";
import { ThunkAppDispatch } from "./types";

const GET_USERS = "users/getAll";
const FOLLOW_USER = "users/follow";
const UNFOLLOW_USER = "users/unfollow";

export const getUsersAsync = createAsyncThunk<TGetUsersData, TGetUsersPayload>(
  GET_USERS,
  async ({ currentPage, pageSize, term = '', friend = null }) => {
    const { items, totalCount } = await usersAPI.getUsers(
      currentPage,
      pageSize,
      term,
      friend
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
  if (data.resultCode === API_CODES.SUCCESS) {
    dispatch(setFollowed({ userid, status }));
  }

  dispatch(setFollowingProgress({ followingInProgress: false, userid }));
};
