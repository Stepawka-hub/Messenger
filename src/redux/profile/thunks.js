import { profileAPI } from "../../api/api";
import { setUserProfileAC, setUserStatusAC } from "./actions";

export const getProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId).then((data) => {
    dispatch(setUserProfileAC(data));
  });
};

export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getUserStatus(userId).then((data) => {
    dispatch(setUserStatusAC(data.data));
  });
};

export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateUserStatus(status).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setUserStatusAC(status));
    }
  });
};
