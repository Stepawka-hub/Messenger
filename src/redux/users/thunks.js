import { usersAPI } from "../../api/api";
import { 
  followAC, 
  setFollowingProgressAC, 
  setLoadingAC, 
  setTotalUsersCountAC, 
  setUsersAC, 
  unfollowAC 
} from './actions';

export const getUsers = (currentPage, pageSize) => (dispatch) => {
  dispatch(setLoadingAC(true));

  usersAPI.getUsers(currentPage, pageSize).then((data) => {
    const users = data.items.map((item) => ({
      ...item,
      location: { country: "Russia", city: "Moscow" },
    }));

    dispatch(setLoadingAC(false));
    dispatch(setTotalUsersCountAC(data.totalCount));
    dispatch(setUsersAC(users));
  });
};

export const followToUser = (id) => (dispatch) => {
  dispatch(setFollowingProgressAC(true, id));
  usersAPI.followUser(id).then((data) => {
    if (data.resultCode === 0) {
      dispatch(followAC(id));
    }

    dispatch(setFollowingProgressAC(false, id));
  });
};

export const unfollowFromUser = (id) => (dispatch) => {
  dispatch(setFollowingProgressAC(true, id));
  usersAPI.unfollowUser(id).then((data) => {
    if (data.resultCode === 0) {
      dispatch(unfollowAC(id));
    }

    dispatch(setFollowingProgressAC(false, id));
  });
};
