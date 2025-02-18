import { 
  FOLLOW_TO_USER, 
  SET_CURRENT_PAGE, 
  SET_TOTAL_USERS_COUNT, 
  SET_USERS, 
  TOGGLE_IS_FOLLOWING_PROGRESS, 
  TOGGLE_IS_LOADING, 
  UNFOLLOW_FROM_USER 
} from './actionTypes';

const initialState = {
  users: [],
  totalUsersCount: 1,
  pageSize: 4,
  currentPage: 1,
  isLoading: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_TO_USER: {
      return setFollowed(state, action.userid, true);
    }

    case UNFOLLOW_FROM_USER: {
      return setFollowed(state, action.userid, false);
    }

    case SET_USERS: {
      return setUsers(state, action.users);
    }

    case SET_TOTAL_USERS_COUNT: {
      return setTotalUsersCount(state, action.count);
    }

    case SET_CURRENT_PAGE: {
      return setCurrentPage(state, action.currentPage);
    }

    case TOGGLE_IS_LOADING: {
      return setLoading(state, action.isLoading);
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return setFollowingProgress(
        state,
        action.followingInProgress,
        action.userid
      );
    }

    default:
      return state;
  }
};

const setFollowed = (state, userid, status) => ({
  ...state,
  users: state.users.map((user) => {
    if (user.id === userid) {
      return { ...user, followed: status };
    }

    return user;
  }),
});

const setUsers = (state, users) => ({
  ...state,
  users,
});

const setTotalUsersCount = (state, count) => ({
  ...state,
  totalUsersCount: count,
});

const setCurrentPage = (state, currentPage) => ({
  ...state,
  currentPage: currentPage,
});

const setLoading = (state, isLoading) => ({
  ...state,
  isLoading,
});

export const setFollowingProgress = (state, followingInProgress, userid) => ({
  ...state,
  followingInProgress: followingInProgress
    ? [...state.followingInProgress, userid]
    : state.followingInProgress.filter((id) => id !== userid),
});

export default usersReducer;
