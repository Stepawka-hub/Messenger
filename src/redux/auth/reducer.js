import { SET_USER_DATA, TOGGLE_IS_LOADING } from './actionTypes';

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

export default authReducer;
