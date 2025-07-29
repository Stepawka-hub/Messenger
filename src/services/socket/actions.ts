import { createAction, isAnyOf } from "@reduxjs/toolkit";
import {
  SEND_MESSAGE,
  WEBSOCKET_CONNECTED,
  WEBSOCKET_DISCONNECTED,
} from "./constants";

export const socketConnect = createAction(WEBSOCKET_CONNECTED);
export const socketDisconnect = createAction(WEBSOCKET_DISCONNECTED);
export const sendMessage = createAction<string, string>(SEND_MESSAGE);

export const isWhitelistedAction = isAnyOf(
  socketConnect,
  socketDisconnect,
  sendMessage
);
