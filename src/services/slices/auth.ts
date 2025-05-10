import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "@thunks/app";

const initialState = {
  user: null,
  isLoading: false,
  isAuth: false,
  captchaUrl: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    case SET_USER_DATA: {
      return setAuthUserData(state, action.payload);
    }

    case TOGGLE_IS_LOADING: {
      return setLoading(state, action.isLoading);
    }

    case SET_CAPTCHA_URL: {
      return setCaptchaUrl(state, action.captchaUrl);
    }
  },
  selectors: {
    getCurrentUserId: (state) => state.user.id,
    getAuthLogin: (state) => state.user.login,
    getAuthEmail: (state) => state.user.email,
    getAuthPhoto: (state) => state.user.photos,

    getIsLoading: (state) => state.isLoading,
    getIsAuth: (state) => state.isAuth,
    getCaptchaUrl: (state) => state.captchaUrl,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.initialized = false;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialized = false;
      });
  },
});

export const reducer = authSlice.reducer;
export const { getInitializedSelector, getModalSelector } = authSlice.selectors;
