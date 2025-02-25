import { profileAPI } from "../../api/api";
import {
  setIsUpdatingPhotoAC,
  setUserPhotoAC,
  setUserProfileAC,
  setUserStatusAC,
} from "./actions";
import { getCurrentUserId } from "../auth/selectors";
import { stopSubmit } from 'redux-form';
import { handleError } from '../../utils/helpers/errorsHelpers';

export const getProfile = (userId, navigate) => async (dispatch) => {
  try {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(data));
  } catch(err) {
    navigate('/profile');
    handleError('Произошла ошибка!', 'Некорректный профиль!', 5000)(dispatch);
  }
};

export const getUserStatus = (userId, navigate) => async (dispatch) => {
  try {
    const data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatusAC(data.data));
  } catch(err) {
    navigate('/profile');
    handleError('Произошла ошибка!', 'Некорректный профиль!', 5000)(dispatch);
  }
};

export const updateUserStatus = (status) => async (dispatch) => {
  const res = await profileAPI.updateUserStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setUserStatusAC(status));
  } else {
    handleError('Произошла ошибка!', 'Слишком длинный статус!')(dispatch);
  }
};

export const updateUserPhoto = (photo) => async (dispatch) => {
  dispatch(setIsUpdatingPhotoAC(true));

  const res = await profileAPI.updatePhoto(photo);
  if (res.resultCode === 0) {
    dispatch(setUserPhotoAC(res.data.photos));
  }

  dispatch(setIsUpdatingPhotoAC(false));
};

export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  const userId = getCurrentUserId(getState());

  const res = await profileAPI.updateProfile(profileData);
  if (res.resultCode === 0) {
    dispatch(getProfile(userId));
  } else {
    const message = res.messages.length > 0 ? res.messages[0] : 'Some error';
    dispatch(stopSubmit('profile-edit', {_error: message}));
  }
};
