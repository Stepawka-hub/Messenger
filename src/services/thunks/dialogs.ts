import { API_CODES } from "@api/constants";
import { dialogsAPI } from "@api/dialogs.api";
import { TSendMessagePayload } from "@api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TDialog, TMessage, TUserId } from "@types";
import { createErrorPayload } from "@utils/helpers/error-helpers";
import { TBaseRejectValue } from "./types";
import { formatDateToISOString } from "@utils/helpers/date";

const GET_DIALOGS = "dialogs/get-dialogs";
const START_DIALOG = "dialogs/start";
const SEND_MESSAGE = "dialogs/send-message";
const GET_MESSAGES = "dialogs/get-messages";

export const getDialogsAsync = createAsyncThunk<
  TDialog[],
  void,
  TBaseRejectValue
>(GET_DIALOGS, async (_, { rejectWithValue }) => {
  try {
    const dialogs = await dialogsAPI.getDialogs();
    return dialogs.map(
      ({ lastDialogActivityDate, lastUserActivityDate, ...d }) => ({
        ...d,
        lastDialogActivityDate: formatDateToISOString(lastDialogActivityDate),
        lastUserActivityDate: formatDateToISOString(lastUserActivityDate),
      })
    );
  } catch (err) {
    console.error("Error fetching dialogs:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const startDialogAsync = createAsyncThunk<
  void,
  TUserId,
  TBaseRejectValue
>(START_DIALOG, async (userId, { rejectWithValue }) => {
  try {
    const { resultCode, messages } = await dialogsAPI.startDialog(userId);

    if (resultCode !== API_CODES.SUCCESS) {
      return rejectWithValue(
        createErrorPayload({
          message: messages[0] || "Не удалось начать диалог",
        })
      );
    }
  } catch (err) {
    console.error("Error starting dialog:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const getMessagesAsync = createAsyncThunk<
  TMessage[],
  TUserId,
  TBaseRejectValue
>(GET_MESSAGES, async (userId, { rejectWithValue }) => {
  try {
    const messages = await dialogsAPI.getMessages(userId);
    return messages;
  } catch (err) {
    console.error("Error fetching messages:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const sendMessageAsync = createAsyncThunk<
  TMessage,
  TSendMessagePayload,
  TBaseRejectValue
>(SEND_MESSAGE, async ({ userId, message }, { rejectWithValue }) => {
  try {
    const { resultCode, data, messages } = await dialogsAPI.sendMessage(
      userId,
      message
    );

    if (resultCode === API_CODES.SUCCESS) {
      return data.message;
    }

    return rejectWithValue(
      createErrorPayload({
        message: messages[0] || "Не удалось отправить сообщение",
      })
    );
  } catch (err) {
    console.error("Error sending message:", err);
    return rejectWithValue(createErrorPayload());
  }
});
