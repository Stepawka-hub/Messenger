export type TWebSocketState = {
  wsChannel: WebSocket | null;
  isConnected: boolean;
};

export type WebSocketProviderProps = {
  url?: string;
}