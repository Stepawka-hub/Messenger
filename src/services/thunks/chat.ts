import { chatAPI } from "@api/chat.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessages } from "@slices/chat";
import { ThunkAppDispatch, TNewMessageHandler } from "./types";
import { TChatMessage } from "@types";

const START_MESSAGES_LISTENING = "chat/start-messages-listening";
const STOP_MESSAGES_LISTENING = "chat/stop-messages-listening";
const SEND_MESSAGE = "chat/send-message";

let _newMessageHandler: TNewMessageHandler = null;
const newMessageHandlerCreator = (dispatch: ThunkAppDispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: TChatMessage[]) => {
      dispatch(setMessages(messages));
    };
  }

  return _newMessageHandler;
};

export const startMessagesListening = createAsyncThunk(
  START_MESSAGES_LISTENING,
  async (_, { dispatch }) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));
  }
);

export const stopMessagesListening = createAsyncThunk(
  STOP_MESSAGES_LISTENING,
  async (_, { dispatch }) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    chatAPI.stop();
  }
);

export const sendMessageAsync = createAsyncThunk<void, string>(
  SEND_MESSAGE,
  async (message) => {
    chatAPI.sendMessage(message);
  }
);
