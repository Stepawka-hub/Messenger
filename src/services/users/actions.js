import { 
  FOLLOW_TO_USER, 
  SET_CURRENT_PAGE, 
  SET_TOTAL_USERS_COUNT, 
  SET_USERS, 
  TOGGLE_IS_FOLLOWING_PROGRESS, 
  TOGGLE_IS_LOADING, 
  UNFOLLOW_FROM_USER 
} from './actionTypes';

// Action Creators
export const followAC = (userid) => ({
  type: FOLLOW_TO_USER,
  userid,
});

export const unfollowAC = (userid) => ({
  type: UNFOLLOW_FROM_USER,
  userid,
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users,
});

export const setTotalUsersCountAC = (count) => ({
  type: SET_TOTAL_USERS_COUNT,
  count,
});

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setLoadingAC = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading,
});

export const setFollowingProgressAC = (followingInProgress, userid) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  followingInProgress,
  userid,
});