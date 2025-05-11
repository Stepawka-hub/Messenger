import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUserDataAsync, getCaptchaAsync } from "@thunks/auth";
import { TUserData } from "src/types";
import { TAuthState } from "./types";

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  captchaUrl: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserData: (state, { payload }: PayloadAction<TUserData | null>) => {
      state.user = payload;
    },
  },
  selectors: {
    getCurrentUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading,
    getIsAuth: (state) => state.isAuth,
    getCaptchaUrl: (state) => state.captchaUrl,
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
      });
  },
});

export const reducer = authSlice.reducer;
export const { getCaptchaUrl, getCurrentUser, getIsAuth, getIsLoading } =
  authSlice.selectors;
export const { setAuthUserData } = authSlice.actions;
