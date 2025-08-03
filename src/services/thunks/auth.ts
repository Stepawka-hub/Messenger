import { authAPI } from "@api/auth.api";
import { API_CODES } from "@api/constants";
import { profileAPI } from "@api/profile.api";
import { securityAPI } from "@api/security.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "@slices/toast";
import { TPhotos, TUserData } from "@types";
import { TLoginPayload } from "@utils/api/types";
import { createErrorPayload } from "@utils/helpers";
import { TBaseRejectValue } from "./types";

const GET_USER_DATA = "auth/get-user-data";
const USER_LOGIN = "auth/login";
const USER_LOGOUT = "auth/logout";
const GET_CAPTCHA = "auth/get-captcha";

export const getAuthUserDataAsync = createAsyncThunk<
  TUserData,
  void,
  TBaseRejectValue
>(GET_USER_DATA, async (_, { dispatch, rejectWithValue }) => {
  try {
    const { resultCode, data, messages } = await authAPI.me();

    if (resultCode === API_CODES.SUCCESS) {
      const { id, email } = data;
      let login = "None";
      let photos: TPhotos | null = null;

      try {
        const profileData = await profileAPI.getProfile(id);
        photos = profileData.photos;
        login = profileData.fullName;
      } catch (err) {
        console.warn("Error getting profile: ", err);
        dispatch(
          addToast({
            type: "error",
            content:
              "Возникла ошибка при загрузке профиля. Некоторые данные могут быть недоступны",
          })
        );
      }

      return { id, login, email, photos };
    }

    return rejectWithValue(
      createErrorPayload({
        type: "NONE",
        message: messages[0] || "Не удалось получить данные пользователя",
      })
    );
  } catch (err) {
    console.error("Error getting user data: ", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const loginUserAsync = createAsyncThunk<
  void,
  TLoginPayload,
  TBaseRejectValue
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
        localStorage.setItem("login-email", email);
        dispatch(getAuthUserDataAsync());
      } else {
        // get captcha if required
        if (resultCode === API_CODES.CAPTCHA_REQUIRED) {
          dispatch(getCaptchaAsync());
        }

        return rejectWithValue(
          createErrorPayload({
            type: "INLINE",
            message: messages[0] || "Не удалось войти в аккаунт",
          })
        );
      }
    } catch (err) {
      console.error("Login error: ", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);

export const logoutUserAsync = createAsyncThunk<void, void, TBaseRejectValue>(
  USER_LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      const { resultCode, messages } = await authAPI.logout();

      if (resultCode !== API_CODES.SUCCESS) {
        return rejectWithValue(
          createErrorPayload({
            message: messages[0] || "Произошла ошибка при выходе из аккаунта",
          })
        );
      }
    } catch (err) {
      console.error("Logout error: ", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);

export const getCaptchaAsync = createAsyncThunk<string, void, TBaseRejectValue>(
  GET_CAPTCHA,
  async (_, { rejectWithValue }) => {
    try {
      const { url } = await securityAPI.getCaptchaURL();
      return url;
    } catch (err) {
      console.error("Error getting captcha: ", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);
