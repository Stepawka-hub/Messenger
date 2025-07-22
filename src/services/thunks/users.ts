import { API_CODES } from "@api/constants";
import { usersAPI } from "@api/users.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFollowed, setFollowingProgressIds } from "@slices/users";
import { TSocialUser, TUserId } from "@types";
import { TGetItemsDataResponse, TGetUsersPayload } from "@utils/api/types";
import { createErrorPayload } from "@utils/helpers/error-helpers";
import { TBaseRejectValue } from "./types";
import { TFollowUnfollowPayload } from "../types";

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
  void,
  TFollowUnfollowPayload,
  TBaseRejectValue
>(
  FOLLOW_UNFOLLOW_FLOW,
  async ({ userId, status }, { dispatch, rejectWithValue }) => {
    const apiMethod = status
      ? usersAPI.followUser.bind(usersAPI)
      : usersAPI.unfollowUser.bind(usersAPI);

    try {
      dispatch(
        setFollowingProgressIds({ followingInProgress: true, userid: userId })
      );

      const data = await apiMethod(userId);
      if (data.resultCode !== API_CODES.SUCCESS) {
        const actionText = status ? "подписки на" : "отписки от";
        return rejectWithValue(
          createErrorPayload({
            message: data.messages[0] || `Ошибка ${actionText} пользователя`,
          })
        );
      }

      dispatch(setFollowed({ userid: userId, status }));
    } catch (err) {
      console.error(
        status ? "Error follow to user" : "Error unfollow from user",
        err
      );
      return rejectWithValue(createErrorPayload());
    } finally {
      dispatch(
        setFollowingProgressIds({ followingInProgress: false, userid: userId })
      );
    }
  }
);
