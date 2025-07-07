import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthUserDataAsync,
  getCaptchaAsync,
  loginUserAsync,
  logoutUserAsync,
} from "@thunks/auth";
import { TPhotos, TUserData } from "src/types";
import { TAuthState } from "./types";

const initialState: TAuthState = {
  user: null,
  isAuth: false,
  captchaUrl: null,
  loading: {
    isGettingUserData: false,
    isLoggingIn: false,
    isLoggingOut: false,
  },
  error: {
    loginError: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserPhoto: (state, { payload }: PayloadAction<TPhotos>) => {
      if (state.user) {
        state.user.photos = payload;
      }
    },
    setUserLogin: (state, { payload }: PayloadAction<string>) => {
      if (state.user) {
        state.user.login = payload;
      }
    },
  },
  selectors: {
    getCurrentUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getCaptchaUrl: (state) => state.captchaUrl,
    getIsLoadingUserData: (state) => state.loading.isGettingUserData,
    getIsLoggingIn: (state) => state.loading.isLoggingIn,
    getIsLoggingOut: (state) => state.loading.isLoggingOut,
    getLoginError: (state) => state.error.loginError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCaptchaAsync.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.captchaUrl = payload;
        }
      )

      .addCase(getAuthUserDataAsync.pending, (state) => {
        state.loading.isGettingUserData = true;
      })
      .addCase(
        getAuthUserDataAsync.fulfilled,
        (state, { payload }: PayloadAction<TUserData>) => {
          state.loading.isGettingUserData = false;
          state.user = payload;
          state.isAuth = true;
        }
      )
      .addCase(getAuthUserDataAsync.rejected, (state) => {
        state.loading.isGettingUserData = false;
        state.isAuth = false;
        state.user = null;
      })

      .addCase(loginUserAsync.pending, (state) => {
        state.error.loginError = null;
        state.loading.isLoggingIn = true;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.loading.isLoggingIn = false;
        state.captchaUrl = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading.isLoggingIn = false;
        state.error.loginError =
          action.payload?.message || "Произошла неизвестная ошибка!";
      })

      .addCase(logoutUserAsync.pending, (state) => {
        state.loading.isLoggingOut = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.loading.isLoggingOut = false;
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.loading.isLoggingOut = false;
      });
  },
});

export const reducer = authSlice.reducer;
export const {
  getLoginError,
  getCaptchaUrl,
  getCurrentUser,
  getIsAuth,
  getIsLoadingUserData,
  getIsLoggingOut,
  getIsLoggingIn,
} = authSlice.selectors;
export const { setUserLogin, setUserPhoto } = authSlice.actions;
