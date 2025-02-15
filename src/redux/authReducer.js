import { authAPI, profileAPI } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";
const SET_IS_AUTH = "SET-IS-AUTH";

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
      return setAuthUserData(state, action.data);
    }

    case TOGGLE_IS_LOADING: {
      return setLoading(state, action.isLoading);
    }

    case SET_IS_AUTH: {
      return setAuth(state, action.isAuth);
    }

    default:
      return state;
  }
};

const setAuthUserData = (state, data) => {
  return {
    ...state,
    ...data,
  };
};

const setLoading = (state, isLoading) => {
  return {
    ...state,
    isLoading,
  };
};

const setAuth = (state, isAuth) => {
  return {
    ...state,
    isAuth,
  };
};

// Actions Creator
export const setAuthUserDataAC = (id, login, email, photos) => ({
  type: SET_USER_DATA,
  data: {
    id,
    login,
    email,
    photos,
  },
});

export const setLoadingAC = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const setAuthAC = (isAuth) => ({
  type: SET_IS_AUTH,
  isAuth,
});

// Thunks
export const getAuthUserData = () => (dispatch) => {
  dispatch(setLoadingAC(true));

  authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      const { id, login, email } = data.data;

      profileAPI.getProfile(id).then((data) => {
        const photos = data.photos;
        dispatch(setAuthUserDataAC(id, login, email, photos));
        dispatch(setAuthAC(true));
      });
    }

    dispatch(setLoadingAC(false));
  });
};

export const loginUser =
  (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login({ email, password, rememberMe, captcha }).then(() => {
      
    });
  };

export default authReducer;
