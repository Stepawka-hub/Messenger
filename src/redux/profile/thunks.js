import { profileAPI } from "../../api/api";
import { setUserProfileAC, setUserStatusAC } from "./actions";

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
