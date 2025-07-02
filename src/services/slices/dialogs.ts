import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDialogsAsync } from "@thunks/dialogs";
import { TChatMessage, TDialog, TSocketStatus } from "@types";
import { TDialogsState } from "./types";

const initialState: TDialogsState = {
  dialogs: [],
  messages: [],
  status: "pending",
  loading: {
    dialogs: false,
    messages: false,
  },
  error: {
    dialogs: null,
    messages: null,
  },
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
    getIsLoadingMessages: (state) => state.loading.messages,
    getIsLoadingDialogs: (state) => state.loading.dialogs,
  },
  extraReducers(builder) {
    builder
      .addCase(getDialogsAsync.pending, (state) => {
        state.loading.dialogs = true;
      })
      .addCase(
        getDialogsAsync.fulfilled,
        (state, { payload }: PayloadAction<TDialog[]>) => {
          state.dialogs = payload;
          state.loading.dialogs = false;
        }
      )
      .addCase(getDialogsAsync.rejected, (state) => {
        state.loading.dialogs = false;
      });
  },
});

export const reducer = chatSlice.reducer;
export const {
  getMessages,
  getDialogs,
  getStatus,
  getIsLoadingDialogs,
  getIsLoadingMessages,
} = chatSlice.selectors;
export const { setMessages, setStatus } = chatSlice.actions;
