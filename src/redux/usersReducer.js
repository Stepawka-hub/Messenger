const FOLLOW_TO_USER = "FOLLOW-TO-USER";
const UNFOLLOW_FROM_USER = "UNFOLLOW-FROM-USER";
const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";

const initialState = {
  users: [],
  totalUsersCount: 1,
  pageSize: 4,
  currentPage: 1,
  isLoading: false
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

    default:
      return state;
  }
};

const setFollowed = (state, userid, status) => {
  return {
    ...state,
    users: state.users.map((user) => {
      if (user.id === userid) {
        return { ...user, followed: status}
      }

      return user;
    })
  }
};

const setUsers = (state, users) => {
  return {
    ...state,
    users
  }
};

const setTotalUsersCount = (state, count) => {
  return {
    ...state,
    totalUsersCount: count
  }
}

const setCurrentPage = (state, currentPage) => {
  return {
    ...state,
    currentPage: currentPage
  }
}

const setLoading = (state, isLoading) => {
  return {
    ...state,
    isLoading
  }
}


export const followAC = (userid) => ({
  type: FOLLOW_TO_USER,
  userid
});

export const unfollowAC = (userid) => ({
  type: UNFOLLOW_FROM_USER,
  userid
});

export const setUsersAC = (users) => ({
  type: SET_USERS,
  users
});

export const setTotalUsersCountAC = (count) => ({
  type: SET_TOTAL_USERS_COUNT,
  count
});

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
})

export const setLoadingAC = (isLoading) => ({
  type: TOGGLE_IS_LOADING,
  isLoading
})

export default usersReducer;
