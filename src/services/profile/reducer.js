import avatarBlack from "./../../assets/images/black.png";
import { ADD_POST, DELETE_POST, SET_USER_PHOTO, SET_USER_PROFILE, SET_USER_STATUS, TOGGLE_IS_UPDATING_PHOTO } from './actionTypes';

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
  isUpdatingPhoto: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return addPost(state, action.newPostText);
    }

    case DELETE_POST: {
      return deletePost(state, action.postid);
    }

    case SET_USER_PROFILE: {
      return setUserProfile(state, action.profile);
    }

    case SET_USER_STATUS: {
      return setUserStatus(state, action.status);
    }

    case SET_USER_PHOTO: {
      return setUserPhoto(state, action.photos);
    }

    case TOGGLE_IS_UPDATING_PHOTO: {
      return setIsUpdatingPhoto(state, action.isUpdate);
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

const deletePost = (state, id) => ({
  ...state,
  posts: state.posts.filter(post => post.postid !== id)
});

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

const setUserPhoto = (state, photos) => {
  return {
    ...state,
    profile: {
      ...state.profile,
      photos
    }
  }
}

const setIsUpdatingPhoto = (state, isUpdatingPhoto) => {
  return {
    ...state,
    isUpdatingPhoto
  }
}

export default profileReducer;
