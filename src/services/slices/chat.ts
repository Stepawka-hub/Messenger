import avatarBlack from "@images/black.png";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockDialogs } from "@utils/mock";
import { TChatState } from "./types";

const initialState: TChatState = {
  dialogs: [...mockDialogs],
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, { payload }: PayloadAction<string>) => {
      const message = {
        id: state.messages.length + 1,
        userId: 1,
        userName: "Stepawka",
        photo: avatarBlack,
        message: payload,
      };

      return {
        ...state,
        messages: [...state.messages, message],
      };
    },
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
  },
});

export const reducer = chatSlice.reducer;
export const { getMessages, getDialogs } = chatSlice.selectors;
export const { sendMessage } = chatSlice.actions;
