import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TChatMessage } from "@types";
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
    setMessages: (state, { payload }: PayloadAction<TChatMessage[]>) => {
      state.messages = [...state.messages, ...payload];
    },
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
  },
});

export const reducer = chatSlice.reducer;
export const { getMessages, getDialogs } = chatSlice.selectors;
export const { setMessages } = chatSlice.actions;
