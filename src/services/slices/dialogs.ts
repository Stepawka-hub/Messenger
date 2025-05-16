import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockDialogs, mockMessages } from "@utils/mock";
import avatarBlack from "@images/black.png";

const initialState = {
  dialogs: [...mockDialogs],
  messages: [...mockMessages],
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    sendMessage: (state, { payload }: PayloadAction<string>) => {
      if (!payload) return state;

      const message = {
        id: state.messages.length + 1,
        userid: 1,
        username: "Stepawka",
        avatar: avatarBlack,
        text: payload,
      };

      return {
        ...state,
        messages: [...state.messages, message],
      };
    },
  },
  selectors: {
    getDialogsSelector: (state) => state.dialogs,
    getMessagesSelector: (state) => state.messages,
  },
});

export const reducer = dialogsSlice.reducer;
export const { getMessagesSelector, getDialogsSelector } =
  dialogsSlice.selectors;
export const { sendMessage } = dialogsSlice.actions;
