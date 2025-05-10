import { createSlice } from "@reduxjs/toolkit";
import { TFriendsState } from "./types";

const initialState: TFriendsState = {
  friends: [],
  // friends: [
  //   {
  //     userid: 2,
  //     username: "Maxim",
  //     avatar: avatarOrange,
  //   },
  //   {
  //     userid: 3,
  //     username: "Denis",
  //     avatar: avatarBlack,
  //   },
  //   {
  //     userid: 4,
  //     username: "Alexander",
  //     avatar: avatarBlack,
  //   },
  //   {
  //     userid: 5,
  //     username: "Ruslan",
  //     avatar: avatarBlack,
  //   },
  // ],
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
