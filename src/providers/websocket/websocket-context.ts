import { createContext } from "react";
import { TWebSocketState } from "./types";

const initialState: TWebSocketState = {
  wsChannel: null,
};

export const WebSocketContext = createContext<TWebSocketState>(initialState);
