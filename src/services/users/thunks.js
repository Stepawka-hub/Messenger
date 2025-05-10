import { usersAPI } from "../../api/api";
import {
  followAC,
  setFollowingProgressAC,
  setLoadingAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
} from "./actions";

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(setLoadingAC(true));

  const data = await usersAPI.getUsers(currentPage, pageSize);
  const users = data.items.map((item) => ({
    ...item,
    location: { country: "Russia", city: "Moscow" },
  }));

  dispatch(setLoadingAC(false));
  dispatch(setTotalUsersCountAC(data.totalCount));
  dispatch(setUsersAC(users));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(setFollowingProgressAC(true, userId));
  
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }

  dispatch(setFollowingProgressAC(false, userId));
}

export const followToUser = (userId) => async (dispatch) => {
  const apiMethod = usersAPI.followUser.bind(usersAPI);
  followUnfollowFlow(dispatch, userId, apiMethod, followAC)
};

export const unfollowFromUser = (userId) => async (dispatch) => {
  const apiMethod = usersAPI.unfollowUser.bind(usersAPI);
  followUnfollowFlow(dispatch, userId, apiMethod, unfollowAC)
};
