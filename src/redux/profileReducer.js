import { profileAPI } from "../api/api";
import avatarBlack from "./../assets/images/black.png";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

const initialState = {
  profile: null,
  status: "Нет",
  posts: [
    {
      postid: 1,
      userid: 1,
      message: "Привет! - Post 1",
      username: "Stepawka",
      avatar: avatarBlack,
    },
    {
      postid: 2,
      userid: 1,
      message: "Привет! - Post 2",
      username: "Stepawka",
      avatar: avatarBlack,
    },
  ],
  newPostText: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return addPost(state);
    }

    case UPDATE_NEW_POST_TEXT: {
      return updateNewPostText(state, action.newPostText);
    }

    case SET_USER_PROFILE: {
      return setUserProfile(state, action.profile);
    }

    case SET_USER_STATUS: {
      return setUserStatus(state, action.status);
    }

    default:
      return state;
  }
};

const addPost = (state) => {
  if (!state.newPostText) return state;

  const post = {
    postid: 3,
    userid: 1,
    message: state.newPostText,
    username: "Stepawka",
    avatar: avatarBlack,
  };

  return {
    ...state,
    posts: [...state.posts, post],
    newPostText: "",
  };
};

const updateNewPostText = (state, postText) => {
  return {
    ...state,
    newPostText: postText,
  };
};

const setUserProfile = (state, profile) => {
  return {
    ...state,
    profile,
  };
};

const setUserStatus = (state, status) => {
  return {
    ...state,
    status,
  };
};

// Action creators
export const addPostAC = () => ({ type: ADD_POST });

export const updateNewPostTextAC = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newPostText: text,
});

export const setUserProfileAC = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setUserStatusAC = (status) => ({
  type: SET_USER_STATUS,
  status
});

// Thunk
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

export default profileReducer;
