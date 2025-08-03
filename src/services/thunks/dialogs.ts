import { API_CODES } from "@api/constants";
import { dialogsAPI } from "@api/dialogs.api";
import {
  TGetMessagesPayload,
  TGetNewMessagesPayload,
  TSendMessagePayload,
} from "@api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessageDeletedStatus } from "@slices/dialogs";
import { TGetMessagesReturnValue } from "@slices/types";
import { TDialog, TMessage, TUserId } from "@types";
import { createErrorPayload, formatDateToISOString } from "@utils/helpers";
import { TBaseRejectValue } from "./types";

const GET_DIALOGS = "dialogs/get-dialogs";
const START_DIALOG = "dialogs/start";
const SEND_MESSAGE = "dialogs/send-message";
const GET_MESSAGES = "dialogs/get-messages";
const GET_NEW_MESSAGES = "dialogs/get-new-messages";
const GET_NEW_MESSAGE_COUNT = "dialogs/get-new-message-count";
const DELETE_MESSAGE = "dialogs/delete-message";
const RESTORE_MESSAGE = "dialogs/restore-message";

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
  TGetMessagesReturnValue,
  TGetMessagesPayload,
  TBaseRejectValue
>(
  GET_MESSAGES,
  async ({ userId, currentPage, pageSize }, { rejectWithValue }) => {
    try {
      const { items, totalCount } = await dialogsAPI.getMessages({
        userId,
        currentPage,
        pageSize,
      });

      let numberOfRead = 0;
      const updatedMessages = items.map(({ addedAt, viewed, ...m }) => {
        if (!viewed && userId === m.senderId) {
          numberOfRead++;
        }

        return {
          ...m,
          viewed: userId === m.senderId ? true : viewed,
          addedAt: formatDateToISOString(addedAt),
        };
      });

      return {
        items: updatedMessages,
        totalCount,
        numberOfRead,
      };
    } catch (err) {
      console.error("Error fetching messages:", err);
      return rejectWithValue(createErrorPayload());
    }
  }
);

export const getNewMessagesAsync = createAsyncThunk<
  void,
  TGetNewMessagesPayload,
  TBaseRejectValue
>(GET_NEW_MESSAGES, async ({ userId, date }, { rejectWithValue }) => {
  try {
    // const { items, totalCount } = await dialogsAPI.getNewMessages({
    //   userId,
    //   date,
    // });

    // let numberOfRead = 0;
    // const updatedMessages = items.map(({ addedAt, viewed, ...m }) => {
    //   if (!viewed && userId === m.senderId) {
    //     numberOfRead++;
    //   }

    //   return {
    //     ...m,
    //     viewed: userId === m.senderId ? true : viewed,
    //     addedAt: formatDateToISOString(addedAt),
    //   };
    // });

    // return {
    //   items: updatedMessages,
    //   totalCount,
    //   numberOfRead,
    // };
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
      return {
        ...data.message,
        addedAt: formatDateToISOString(data.message.addedAt),
      };
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

export const getNewMessageCountAsync = createAsyncThunk<
  number,
  void,
  TBaseRejectValue
>(GET_NEW_MESSAGE_COUNT, async (_, { rejectWithValue }) => {
  try {
    const count = await dialogsAPI.getNewMessageCount();
    return count;
  } catch (err) {
    console.error("Error fetching new message count:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const deleteMessageAsync = createAsyncThunk<
  void,
  string,
  TBaseRejectValue
>(DELETE_MESSAGE, async (messageId, { dispatch, rejectWithValue }) => {
  try {
    const { resultCode, messages } = await dialogsAPI.deleteMessage(messageId);

    if (resultCode !== API_CODES.SUCCESS) {
      return rejectWithValue(
        createErrorPayload({
          message: messages[0] || "Не удалось удалить сообщение",
        })
      );
    }

    dispatch(setMessageDeletedStatus({ messageId, value: true }));
  } catch (err) {
    console.error("Error deleting message:", err);
    return rejectWithValue(createErrorPayload());
  }
});

export const restoreMessageAsync = createAsyncThunk<
  void,
  string,
  TBaseRejectValue
>(RESTORE_MESSAGE, async (messageId, { dispatch, rejectWithValue }) => {
  try {
    const { resultCode, messages } = await dialogsAPI.restoreMessage(messageId);

    if (resultCode !== API_CODES.SUCCESS) {
      return rejectWithValue(
        createErrorPayload({
          message: messages[0] || "Не удалось восстановить сообщение",
        })
      );
    }

    dispatch(setMessageDeletedStatus({ messageId, value: false }));
  } catch (err) {
    console.error("Message recovery error:", err);
    return rejectWithValue(createErrorPayload());
  }
});
