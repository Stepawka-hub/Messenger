import { authAPI, profileAPI, securityAPI, SUCCESS_CODE } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUserData } from "@slices/auth";
import { TLoginPayload } from "@utils/api/types";
import { TUserData } from "src/types";

const GET_USER_DATA = "auth/get-user-data";
const USER_LOGIN = "auth/login";
const USER_LOGOUT = "auth/logout";
const GET_CAPTCHA = "auth/get-captcha";

export const getAuthUserDataAsync = createAsyncThunk<TUserData>(
  GET_USER_DATA,
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.me();

      if (res.resultCode === SUCCESS_CODE) {
        const { id, login, email } = res.data;
        const { photos } = await profileAPI.getProfile(id);
        return { id, login, email, photos: photos };
      }

      return rejectWithValue(res.messages[0] || "Failed to get user data");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk<void, TLoginPayload>(
  USER_LOGIN,
  async ({ email, password, rememberMe = false, captcha }, { dispatch }) => {
    const res = await authAPI.login({ email, password, rememberMe, captcha });

    if (res.resultCode === SUCCESS_CODE) {
      dispatch(getAuthUserDataAsync());
    } else {
      // get captcha
      if (res.resultCode === 10) {
        dispatch(getCaptchaAsync());
      }

      // const message = res.messages.length > 0 ? res.messages[0] : "Some error";
      // dispatch(stopSubmit("login", { _error: message }));
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  USER_LOGOUT,
  async (_, { dispatch }) => {
    const res = await authAPI.logout();

    if (res.resultCode === SUCCESS_CODE) {
      dispatch(setAuthUserData(null));
    }
  }
);

export const getCaptchaAsync = createAsyncThunk<string, void>(
  GET_CAPTCHA,
  async () => {
    const response = await securityAPI.getCaptchaURL();
    return response.url;
  }
);
