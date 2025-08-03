import { API_CODES } from "@api/constants";
import { usersAPI } from "@api/users.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TSocialUser, TUserId } from "@types";
import { TGetItemsDataResponse, TGetUsersPayload } from "@api/types";
import { createErrorPayload } from "@utils/helpers";
import { TFollowUnfollowPayload } from "../types";
import { TBaseRejectValue } from "./types";

const GET_USERS = "users/getAll";
const FOLLOW_USER = "users/follow";
const UNFOLLOW_USER = "users/unfollow";
const FOLLOW_UNFOLLOW_FLOW = "users/followUnfollowFlow";

export const getUsersAsync = createAsyncThunk<
  TGetItemsDataResponse<TSocialUser>,
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
  async (userId, { dispatch }) => {
    dispatch(followUnfollowFlow({ userId, status: true }));
  }
);

export const unfollowFromUserAsync = createAsyncThunk<void, TUserId>(
  UNFOLLOW_USER,
  async (userId, { dispatch }) => {
    dispatch(followUnfollowFlow({ userId, status: false }));
  }
);

export const followUnfollowFlow = createAsyncThunk<
  boolean,
  TFollowUnfollowPayload,
  TBaseRejectValue
>(FOLLOW_UNFOLLOW_FLOW, async ({ userId, status }, { rejectWithValue }) => {
  const apiMethod = status
    ? usersAPI.followUser.bind(usersAPI)
    : usersAPI.unfollowUser.bind(usersAPI);

  try {
    const { resultCode, messages } = await apiMethod(userId);

    if (resultCode === API_CODES.SUCCESS) {
      return status;
    }

    const actionText = status ? "подписки на" : "отписки от";
    return rejectWithValue(
      createErrorPayload({
        message: messages[0] || `Ошибка ${actionText} пользователя`,
      })
    );
  } catch (err) {
    console.error(
      status ? "Error follow to user" : "Error unfollow from user",
      err
    );
    return rejectWithValue(createErrorPayload());
  }
});
