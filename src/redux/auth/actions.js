import { SET_USER_DATA, TOGGLE_IS_LOADING } from './actionTypes';

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