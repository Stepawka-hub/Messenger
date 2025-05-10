import { stopSubmit } from 'redux-form';
import { authAPI, profileAPI, securityAPI } from "../../api/api";
import { setAuthUserDataAC, setCaptchaUrlAC, setLoadingAC } from './actions';

export const getAuthUserData = () => async (dispatch) => {
  dispatch(setLoadingAC(true));

  try {
    const res = await authAPI.me();
    if (res.resultCode === 0) {
      const { id, login, email } = res.data;
      const data = await profileAPI.getProfile(id);
      dispatch(setAuthUserDataAC(id, login, email, data.photos, true));
    }
  } catch (error) {
    console.error("Error in getAuthUserData:", error);
  } finally {
    dispatch(setLoadingAC(false));
  }
};

export const loginUser = (email, password, rememberMe = false, captcha) => async (dispatch) => { 
  const res = await authAPI.login({ email, password, rememberMe, captcha });

  if (res.resultCode === 0) {
    dispatch(getAuthUserData());
  }
  else {
    // get captcha
    if (res.resultCode === 10) {
      dispatch(getCaptcha());
    }

    const message = res.messages.length > 0 ? res.messages[0] : 'Some error';
    dispatch(stopSubmit('login', {_error: message}));
  }
};

export const logoutUser = () => async (dispatch) => {
  const res = await authAPI.logout()

  if (res.resultCode === 0) {
    dispatch(setAuthUserDataAC(null, null, null, null, false, null));
  }
};

export const getCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaUrl = response.url;

  dispatch(setCaptchaUrlAC(captchaUrl));
}