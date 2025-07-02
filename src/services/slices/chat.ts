import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TChatMessage, TSocketStatus } from "@types";
import { mockDialogs } from "@utils/mock";
import { TChatState } from "./types";

const initialState: TChatState = {
  dialogs: [...mockDialogs],
  messages: [],
  status: "pending",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<TChatMessage[]>) => {
      state.messages = [...state.messages, ...payload];
    },
    setStatus: (state, { payload }: PayloadAction<TSocketStatus>) => {
      state.status = payload;
    },
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
    getStatus: (state) => state.status,
  },
});

export const reducer = chatSlice.reducer;
export const { getMessages, getDialogs, getStatus } = chatSlice.selectors;
export const { setMessages, setStatus } = chatSlice.actions;
