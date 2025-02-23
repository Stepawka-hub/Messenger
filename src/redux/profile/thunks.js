import { profileAPI } from "../../api/api";
import { setIsUpdatingPhotoAC, setUserPhotoAC, setUserProfileAC, setUserStatusAC } from "./actions";

export const getProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfileAC(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getUserStatus(userId);
  dispatch(setUserStatusAC(data.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  const res = await profileAPI.updateUserStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setUserStatusAC(status));
  }
};

export const updateUserPhoto = (photo) => async (dispatch) => {
  dispatch(setIsUpdatingPhotoAC(true));

  const res = await profileAPI.updatePhoto(photo);
  if (res.resultCode === 0) {
    dispatch(setUserPhotoAC(res.data.photos));
  }

  dispatch(setIsUpdatingPhotoAC(false));
}
