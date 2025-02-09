import { usersAPI } from '../api/api';
import avatarBlack from "./../assets/images/black.png";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";

const initialState = {
  profile: null,
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

// Action creators
export const addPostAC = () => ({ type: ADD_POST });

export const updateNewPostTextAC = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newPostText: text,
});

export const setUserProfileAC = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};


// Thunk
export const getProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId).then((data) => {
    dispatch(setUserProfileAC(data));
  });
};

export default profileReducer;
