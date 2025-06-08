import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAuthUserDataAsync,
  getCaptchaAsync,
  loginUserAsync,
  logoutUserAsync,
} from "@thunks/auth";
import { TUserData } from "src/types";
import { TAuthState } from "./types";

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  captchaUrl: null,
  isLoggingIn: false,
  loginError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    getCurrentUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading,
    getIsAuth: (state) => state.isAuth,
    getCaptchaUrl: (state) => state.captchaUrl,
    getIsLoggingIn: (state) => state.isLoggingIn,
    getLoginError: (state) => state.loginError,
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
        state.isLoading = true;
      })
      .addCase(
        getAuthUserDataAsync.fulfilled,
        (state, { payload }: PayloadAction<TUserData>) => {
          state.isLoading = false;
          state.user = payload;
          state.isAuth = true;
        }
      )
      .addCase(getAuthUserDataAsync.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })

      .addCase(loginUserAsync.pending, (state) => {
        state.loginError = null;
        state.isLoggingIn = true;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.loginError = action.payload?.message || "Unknown error";
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export const reducer = authSlice.reducer;
export const {
  getLoginError,
  getIsLoggingIn,
  getCaptchaUrl,
  getCurrentUser,
  getIsAuth,
  getIsLoading,
} = authSlice.selectors;
