import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteMessageAsync,
  getDialogsAsync,
  getMessagesAsync,
  getNewMessageCountAsync,
  restoreMessageAsync,
  sendMessageAsync,
  startDialogAsync,
} from "@thunks/dialogs";
import { TDialog, TMessage } from "@types";
import { removeFromArray, safeSub } from "@utils/helpers";
import {
  TDialogsState,
  TSetDeletedPayload,
  TSetDialogActivityDatePayload,
} from "./types";

const initialState: TDialogsState = {
  dialogs: [],
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
    setMessages: (state, { payload }: PayloadAction<TMessage[]>) => {
      state.messages = payload;
    },
    setMessageDeletedStatus: (
      state,
      { payload }: PayloadAction<TSetDeletedPayload>
    ) => {
      const { messageId, value } = payload;
      const message = state.messages.find((m) => m.id === messageId);

      if (message) {
        message.isDeleted = value;
      }
    },
    moveDialogToTop: (state, { payload }: PayloadAction<number>) => {
      const index = state.dialogs.findIndex((d) => d.id === payload);

      if (index > 0) {
        const foundDialog = state.dialogs[index];
        const newDialogs = state.dialogs.filter((d) => d.id !== payload);
        state.dialogs = [foundDialog, ...newDialogs];
      }
    },
    setDialogActivityDate: (
      state,
      { payload }: PayloadAction<TSetDialogActivityDatePayload>
    ) => {
      const dialog = state.dialogs.find((d) => d.id === payload.dialogId);

      if (dialog) {
        dialog.lastDialogActivityDate = payload.date;
      }
    },
    setCurrentDialog: (state) => {
      state.hasMoreMessages = true;
      state.pagination.messages.currentPage = 1;
      state.pagination.messages.totalCount = 0;
      state.messages = [];
    },
    setDialogsPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.dialogs.currentPage = payload;
    },
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
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
      .addCase(getMessagesAsync.fulfilled, (state, { payload, meta }) => {
        const { items, totalCount, numberOfRead } = payload;
        const { userId } = meta.arg;

        if (numberOfRead > 0) {
          const dialog = state.dialogs.find((d) => d.id === userId);

          if (dialog) {
            // Update number of messages in the dialog
            dialog.newMessagesCount = safeSub(
              dialog.newMessagesCount,
              numberOfRead
            );

            // Update total number of messages
            state.newMessageCount = safeSub(
              state.newMessageCount,
              numberOfRead
            );
          }
        }

        const pagination = state.pagination.messages;
        if (items.length) {
          state.messages = [...items, ...state.messages];

          if (state.messages.length >= totalCount || items.length < pagination.pageSize) {
            state.hasMoreMessages = false;
          } else {
            pagination.currentPage += 1;
          }
        }

        state.pagination.messages.totalCount = totalCount;
        state.loading.isGettingMessages = false;
      })
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

      .addCase(deleteMessageAsync.pending, (state, { meta }) => {
        state.loading.deletingMessageIds.push(meta.arg);
      })
      .addCase(deleteMessageAsync.fulfilled, (state, { meta }) => {
        state.loading.deletingMessageIds = removeFromArray(
          state.loading.deletingMessageIds,
          meta.arg
        );
      })
      .addCase(deleteMessageAsync.rejected, (state, { meta }) => {
        state.loading.deletingMessageIds = removeFromArray(
          state.loading.deletingMessageIds,
          meta.arg
        );
      })

      .addCase(restoreMessageAsync.pending, (state, { meta }) => {
        state.loading.restoringMessageIds.push(meta.arg);
      })
      .addCase(restoreMessageAsync.fulfilled, (state, { meta }) => {
        state.loading.restoringMessageIds = removeFromArray(
          state.loading.restoringMessageIds,
          meta.arg
        );
      })
      .addCase(restoreMessageAsync.rejected, (state, { meta }) => {
        state.loading.restoringMessageIds = removeFromArray(
          state.loading.restoringMessageIds,
          meta.arg
        );
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
  moveDialogToTop,
  setDialogActivityDate,
} = dialogsSlice.actions;
