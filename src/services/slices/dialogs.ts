import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDialogsAsync, getMessagesAsync } from "@thunks/dialogs";
import { TDialog, TMessage } from "@types";
import { TDialogsState } from "./types";

const initialState: TDialogsState = {
  dialogs: [],
  messages: [],
  loading: {
    dialogs: false,
    messages: false,
  },
  error: {
    dialogs: null,
    messages: null,
  },
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {},
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
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
      })

      .addCase(getMessagesAsync.pending, (state) => {
        state.loading.messages = true;
      })
      .addCase(
        getMessagesAsync.fulfilled,
        (state, { payload }: PayloadAction<TMessage[]>) => {
          state.messages = payload;
          state.loading.messages = false;
        }
      )
      .addCase(getMessagesAsync.rejected, (state) => {
        state.loading.messages = false;
      });
  },
});

export const reducer = dialogsSlice.reducer;
export const {
  getMessages,
  getDialogs,
  getIsLoadingDialogs,
  getIsLoadingMessages,
} = dialogsSlice.selectors;
