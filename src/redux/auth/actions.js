import { SET_CAPTCHA_URL, SET_USER_DATA, TOGGLE_IS_LOADING } from './actionTypes';

export const setAuthUserDataAC = (id, login, email, photos, isAuth, captchaUrl) => ({
  type: SET_USER_DATA,
  payload: {
    id,
    login,
    email,
    photos,
    isAuth,
    captchaUrl
  },
});

export const setLoadingAC = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const setCaptchaUrlAC = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  captchaUrl
})