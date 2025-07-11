import { chatAPI } from "@api/chat.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMessages, setMessages, setStatus } from "@slices/chat";
import {
  ThunkAppDispatch,
  TNewMessageHandler,
  TStatusChangedHandler,
} from "./types";
import { TChatMessage, TSocketStatus } from "@types";

const START_MESSAGES_LISTENING = "chat/start-messages-listening";
const STOP_MESSAGES_LISTENING = "chat/stop-messages-listening";
const SEND_MESSAGE = "chat/send-message";

let _newMessageHandler: TNewMessageHandler = null;
const newMessageHandlerCreator = (dispatch: ThunkAppDispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: TChatMessage[]) => {
      dispatch(addMessages(messages));
    };
  }

  return _newMessageHandler;
};

let _statusChangedHandler: TStatusChangedHandler = null;
const statusChangedHandlerCreator = (dispatch: ThunkAppDispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: TSocketStatus) => {
      dispatch(setStatus(status));
    };
  }

  return _statusChangedHandler;
};

export const startMessagesListening = createAsyncThunk(
  START_MESSAGES_LISTENING,
  async (_, { dispatch }) => {
    chatAPI.start();
    chatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
  }
);

export const stopMessagesListening = createAsyncThunk(
  STOP_MESSAGES_LISTENING,
  async (_, { dispatch }) => {
    chatAPI.unsubscribe("message-received", newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe(
      "status-changed",
      statusChangedHandlerCreator(dispatch)
    );
    dispatch(setMessages([]));
    chatAPI.stop();
  }
);

export const sendMessageAsync = createAsyncThunk<void, string>(
  SEND_MESSAGE,
  async (message) => {
    chatAPI.sendMessage(message);
  }
);
