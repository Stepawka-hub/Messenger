import avatarBlack from "./../../assets/images/black.png";
import { ADD_POST, SET_USER_PROFILE, SET_USER_STATUS } from './actionTypes';

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
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return addPost(state, action.newPostText);
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

const addPost = (state, newPostText) => {
  const post = {
    postid: state.posts.length + 1,
    userid: 1,
    message: newPostText,
    username: "Stepawka",
    avatar: avatarBlack,
  };

  return {
    ...state,
    posts: [...state.posts, post]
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

export default profileReducer;
