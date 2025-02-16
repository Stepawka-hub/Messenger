import { stopSubmit } from 'redux-form';
import { authAPI, profileAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";

const initialState = {
  id: null,
  login: null,
  email: null,
  photos: null,
  isLoading: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return setAuthUserData(state, action.payload);
    }

    case TOGGLE_IS_LOADING: {
      return setLoading(state, action.isLoading);
    }

    default:
      return state;
  }
};

const setAuthUserData = (state, payload) => ({
  ...state,
  ...payload,
});

const setLoading = (state, isLoading) => ({
  ...state,
  isLoading,
});

// Actions Creator
export const setAuthUserDataAC = (id, login, email, photos, isAuth) => ({
  type: SET_USER_DATA,
  payload: {
    id,
    login,
    email,
    photos,
    isAuth,
  },
});

export const setLoadingAC = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

// Thunks
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

export const loginUser = (email, password, rememberMe = false, captcha) => (dispatch) => { 
  authAPI.login({ email, password, rememberMe, captcha })
    .then((res) => {
      if (res.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        const message = res.messages.length > 0 ? res.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
      }
    });
};

export const logoutUser = () => (dispatch) => {
  authAPI.logout().then((res) => {
    if (res.resultCode === 0) {
      dispatch(setAuthUserDataAC(null, null, null, null, false));
    }
  });
};

export default authReducer;
