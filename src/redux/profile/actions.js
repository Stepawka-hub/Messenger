import { ADD_POST, SET_USER_PROFILE, SET_USER_STATUS } from "./actionTypes";

export const addPostAC = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfileAC = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserStatusAC = (status) => ({
  type: SET_USER_STATUS,
  status,
});
