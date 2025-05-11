import { createSlice } from "@reduxjs/toolkit";
import { TFriendsState } from "./types";
import { mockFriends } from '@utils/mock';

const initialState: TFriendsState = {
  friends: [...mockFriends],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  selectors: {
    getFriendsSelector: (state) => state.friends,
  },
});

export const reducer = friendsSlice.reducer;
export const { getFriendsSelector } = friendsSlice.selectors;
