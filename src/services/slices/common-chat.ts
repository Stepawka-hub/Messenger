import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCommonChatMessage, TSocketStatus } from "@types";
import { TChatState } from "./types";

const initialState: TChatState = {
  status: "pending",
  messages: [],
};

const commonChatSlice = createSlice({
  name: "commonChat",
  initialState,
  reducers: {
    addMessages: (state, { payload }: PayloadAction<TCommonChatMessage[]>) => {
      state.messages = [...state.messages, ...payload];
    },
    setMessages: (state, { payload }: PayloadAction<TCommonChatMessage[]>) => {
      state.messages = payload;
    },
    setStatus: (state, { payload }: PayloadAction<TSocketStatus>) => {
      state.status = payload;
    },
  },
  selectors: {
    getMessages: (state) => state.messages,
    getStatus: (state) => state.status,
  },
});

export const reducer = commonChatSlice.reducer;
export const { getMessages, getStatus } = commonChatSlice.selectors;
export const { addMessages, setMessages, setStatus } = commonChatSlice.actions;
