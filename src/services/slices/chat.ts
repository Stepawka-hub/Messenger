import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TChatMessage, TSocketStatus } from "@types";
import { TChatState } from "./types";

const initialState: TChatState = {
  status: "pending",
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessages: (state, { payload }: PayloadAction<TChatMessage[]>) => {
      state.messages = [...state.messages, ...payload];
    },
    setMessages: (state, { payload }: PayloadAction<TChatMessage[]>) => {
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

export const reducer = chatSlice.reducer;
export const { getMessages, getStatus } = chatSlice.selectors;
export const { addMessages, setMessages, setStatus } = chatSlice.actions;
