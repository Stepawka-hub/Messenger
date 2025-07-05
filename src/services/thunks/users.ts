import { API_CODES } from "@api/constants";
import { usersAPI } from "@api/users.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFollowed, setFollowingProgress } from "@slices/users";
import { TUserId } from "@types";
import { TGetUsersData, TGetUsersPayload, TResponse } from "@utils/api/types";
import { createErrorPayload } from "@utils/helpers/error-helpers";
import {
  TBaseRejectValue,
  ThunkAppDispatch,
  TRejectWithValueFn,
} from "./types";

const GET_USERS = "users/getAll";
const FOLLOW_USER = "users/follow";
const UNFOLLOW_USER = "users/unfollow";

export const getUsersAsync = createAsyncThunk<
  TGetUsersData,
  TGetUsersPayload,
  TBaseRejectValue
>(
  GET_USERS,
  async (
    { currentPage, pageSize, term = "", friend = null },
    { rejectWithValue }
  ) => {
    try {
      const { items, totalCount } = await usersAPI.getUsers(
        currentPage,
        pageSize,
        term,
        friend
      );

      return { items, totalCount };
    } catch (err) {
      console.error("Error getting users:", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);

export const followToUserAsync = createAsyncThunk<void, TUserId>(
  FOLLOW_USER,
  async (userId, { dispatch, rejectWithValue }) => {
    const apiMethod = usersAPI.followUser.bind(usersAPI);
    followUnfollowFlow(userId, true, apiMethod, dispatch, rejectWithValue);
  }
);

export const unfollowFromUserAsync = createAsyncThunk<void, TUserId>(
  UNFOLLOW_USER,
  async (userId, { dispatch, rejectWithValue }) => {
    const apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    followUnfollowFlow(userId, false, apiMethod, dispatch, rejectWithValue);
  }
);

const followUnfollowFlow = async (
  userId: TUserId,
  status: boolean,
  apiMethod: (userid: TUserId) => Promise<TResponse>,
  dispatch: ThunkAppDispatch,
  rejectWithValue: TRejectWithValueFn
) => {
  try {
    dispatch(
      setFollowingProgress({ followingInProgress: true, userid: userId })
    );

    const { resultCode, messages } = await apiMethod(userId);
    if (resultCode !== API_CODES.SUCCESS) {
      return rejectWithValue(
        createErrorPayload({
          message: messages[0] || "Failed to follow/unfollow user",
        })
      );
    }

    dispatch(setFollowed({ userid: userId, status: status }));
  } catch (err) {
    console.error("Error following/unfollowing user:", err);
    return rejectWithValue(createErrorPayload());
  } finally {
    dispatch(
      setFollowingProgress({ followingInProgress: false, userid: userId })
    );
  }
};
