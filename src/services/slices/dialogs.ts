import { TGetItemsDataResponse } from "@api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDialogsAsync,
  getMessagesAsync,
  getNewMessageCountAsync,
  sendMessageAsync,
  startDialogAsync,
} from "@thunks/dialogs";
import { TBaseMessage, TDialog, TMessage } from "@types";
import { updateObjectInArray } from "@utils/helpers/array-helpers";
import { TDialogsState, TSetDeletedPayload } from "./types";

const initialState: TDialogsState = {
  dialogs: [],
  selectedDialogId: null,
  messages: [],
  newMessageCount: 0,
  hasMoreMessages: true,
  pagination: {
    dialogs: {
      currentPage: 1,
      pageSize: 7,
    },
    messages: {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
    },
  },
  loading: {
    isGettingDialogs: false,
    isStartingDialog: false,
    isGettingMessages: false,
    isSendingMessage: false,
    deletingMessageIds: [],
    restoringMessageIds: [],
  },
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    moveSelectedDialogToTop: (state) => {
      if (!state.selectedDialogId) return;
      const index = state.dialogs.findIndex(
        (d) => d.id === state.selectedDialogId
      );

      if (index > 0) {
        const selectedDialog = state.dialogs[index];
        const newDialogs = state.dialogs.filter(
          (d) => d.id !== state.selectedDialogId
        );
        state.dialogs = [selectedDialog, ...newDialogs];
      }
    },
    setMessages: (state, { payload }: PayloadAction<TMessage[]>) => {
      state.messages = payload;
    },
    setMessageDeletedStatus: (
      state,
      { payload }: PayloadAction<TSetDeletedPayload>
    ) => {
      const { messageId, value } = payload;
      state.messages = updateObjectInArray(state.messages, messageId, "id", {
        isDeleted: value,
      });
    },
    setCurrentDialog: (state, { payload }: PayloadAction<number | null>) => {
      state.selectedDialogId = payload;
      state.hasMoreMessages = true;
      state.pagination.messages.currentPage = 1;
      state.messages = [];
    },
    setDialogsPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.dialogs.currentPage = payload;
    },
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
    getSelectedDialogId: (state) => state.selectedDialogId,
    getHasMoreMessages: (state) => state.hasMoreMessages,
    getNewMessageCount: (state) => state.newMessageCount,
    getMessagesPagination: (state) => state.pagination.messages,
    getDialogsPagination: (state) => state.pagination.dialogs,
    getIsLoadingMessages: (state) => state.loading.isGettingMessages,
    getIsLoadingDialogs: (state) => state.loading.isGettingDialogs,
    getIsSendingMessage: (state) => state.loading.isSendingMessage,
    getIsStartingDialog: (state) => state.loading.isStartingDialog,
    getDeletingMessageIds: (state) => state.loading.deletingMessageIds,
    getRestoringMessageIds: (state) => state.loading.restoringMessageIds,
  },
  extraReducers(builder) {
    builder
      .addCase(getDialogsAsync.pending, (state) => {
        state.loading.isGettingDialogs = true;
      })
      .addCase(
        getDialogsAsync.fulfilled,
        (state, { payload }: PayloadAction<TDialog[]>) => {
          state.dialogs = payload;
          state.loading.isGettingDialogs = false;
        }
      )
      .addCase(getDialogsAsync.rejected, (state) => {
        state.loading.isGettingDialogs = false;
      })

      .addCase(getMessagesAsync.pending, (state) => {
        state.loading.isGettingMessages = true;
      })
      .addCase(
        getMessagesAsync.fulfilled,
        (
          state,
          { payload }: PayloadAction<TGetItemsDataResponse<TBaseMessage>>
        ) => {
          const { items, totalCount } = payload;

          if (items.length) {
            state.messages = [...items, ...state.messages];
            state.pagination.messages.currentPage += 1;
          }

          if (state.messages.length === totalCount) {
            state.hasMoreMessages = false;
          }

          state.loading.isGettingMessages = false;
        }
      )
      .addCase(getMessagesAsync.rejected, (state) => {
        state.loading.isGettingMessages = false;
      })

      .addCase(sendMessageAsync.pending, (state) => {
        state.loading.isSendingMessage = true;
      })
      .addCase(
        sendMessageAsync.fulfilled,
        (state, { payload }: PayloadAction<TMessage>) => {
          state.messages.push(payload);
          state.loading.isSendingMessage = false;
        }
      )
      .addCase(sendMessageAsync.rejected, (state) => {
        state.loading.isSendingMessage = false;
      })

      .addCase(startDialogAsync.pending, (state) => {
        state.loading.isStartingDialog = true;
      })
      .addCase(startDialogAsync.fulfilled, (state) => {
        state.loading.isStartingDialog = false;
      })
      .addCase(startDialogAsync.rejected, (state) => {
        state.loading.isStartingDialog = false;
      })

      .addCase(
        getNewMessageCountAsync.fulfilled,
        (state, { payload }: PayloadAction<number>) => {
          state.newMessageCount = payload;
        }
      );
  },
});

export const reducer = dialogsSlice.reducer;
export const {
  getMessages,
  getDialogs,
  getIsLoadingDialogs,
  getIsLoadingMessages,
  getIsStartingDialog,
  getIsSendingMessage,
  getSelectedDialogId,
  getMessagesPagination,
  getDialogsPagination,
  getHasMoreMessages,
  getNewMessageCount,
  getDeletingMessageIds,
  getRestoringMessageIds,
} = dialogsSlice.selectors;
export const {
  setMessages,
  setMessageDeletedStatus,
  setDialogsPage,
  setCurrentDialog,
  moveSelectedDialogToTop,
} = dialogsSlice.actions;
