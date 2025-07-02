import { authAPI } from "@api/auth.api";
import { API_CODES } from "@api/constants";
import { profileAPI } from "@api/profile.api";
import { securityAPI } from "@api/security.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError, TUserData } from "@types";
import { TLoginPayload } from "@utils/api/types";

const GET_USER_DATA = "auth/get-user-data";
const USER_LOGIN = "auth/login";
const USER_LOGOUT = "auth/logout";
const GET_CAPTCHA = "auth/get-captcha";

export const getAuthUserDataAsync = createAsyncThunk<TUserData>(
  GET_USER_DATA,
  async (_, { rejectWithValue }) => {
    try {
      const res = await authAPI.me();

      if (res.resultCode === API_CODES.SUCCESS) {
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

export const loginUserAsync = createAsyncThunk<
  void,
  TLoginPayload,
  { rejectValue: TError }
>(
  USER_LOGIN,
  async (
    { email, password, rememberMe, captcha },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { resultCode, messages } = await authAPI.login({
        email,
        password,
        rememberMe,
        captcha,
      });

      if (resultCode === API_CODES.SUCCESS) {
        dispatch(getAuthUserDataAsync());
      } else {
        // get captcha if required
        if (resultCode === API_CODES.CAPTCHA_REQUIRED) {
          dispatch(getCaptchaAsync());
        }

        const message = messages.length > 0 ? messages[0] : "Unknown error";
        return rejectWithValue({ message });
      }
    } catch {
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  USER_LOGOUT,
  async (_, { rejectWithValue }) => {
    const res = await authAPI.logout();

    if (res.resultCode !== API_CODES.SUCCESS) {
      rejectWithValue("Unknown error during logout");
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
