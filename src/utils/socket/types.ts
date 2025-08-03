export type WebSocketEventMap = {
  open: Event;
  message: MessageEvent;
  close: CloseEvent;
  error: Event;
};

export type WebSocketEvent = keyof WebSocketEventMap;

export type WebSocketEventListener<T extends WebSocketEvent> = 
  (event: WebSocketEventMap[T]) => void;