import { dialogsAPI } from "@api/dialogs.api";
import { TSendMessagePayload } from "@api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TDialog, TMessage, TUserId } from "@types";

const GET_DIALOGS = "dialogs/get-dialogs";
const START_DIALOG = "dialogs/start";
const SEND_MESSAGE = "dialogs/send-message";
const GET_MESSAGES = "dialogs/get-messages";

export const getDialogsAsync = createAsyncThunk<TDialog[]>(
  GET_DIALOGS,
  async (_, { rejectWithValue }) => {
    try {
      return await dialogsAPI.getDialogs();
    } catch (err) {
      return rejectWithValue(err || "Failed to get dialogs");
    }
  }
);

export const startDialogAsync = createAsyncThunk<void, TUserId>(
  START_DIALOG,
  async (userId) => {
    await dialogsAPI.startDialog(userId);
  }
);

export const getMessagesAsync = createAsyncThunk<TMessage[], TUserId>(
  GET_MESSAGES,
  async (userId, { rejectWithValue }) => {
    try {
      return await dialogsAPI.getMessages(userId);
    } catch (err) {
      return rejectWithValue(err || "Failed to get messages");
    }
  }
);

export const sendMessageAsync = createAsyncThunk<void, TSendMessagePayload>(
  SEND_MESSAGE,
  async ({ userId, message }) => {
    await dialogsAPI.sendMessage(userId, message);
  }
);
