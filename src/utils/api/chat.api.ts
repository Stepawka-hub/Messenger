import { RECONNECT_DELAY, WS_URL } from "./constants";
import {
  TEventDataTypes,
  TEventNames,
  TSubscriber,
  TSubscribers,
} from "./types";

let ws: WebSocket | null = null;
const subscribers: TSubscribers = {
  "message-received": [],
  "status-changed": [],
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(WS_URL);
  notifySubscribers("status-changed", "pending");
  ws.addEventListener("open", handleOpen);
  ws.addEventListener("close", handleClose);
  ws.addEventListener("message", handleMessage);
  ws.addEventListener("error", handleError);
};

const cleanUp = () => {
  ws?.removeEventListener("open", handleOpen);
  ws?.removeEventListener("close", handleClose);
  ws?.removeEventListener("message", handleMessage);
  ws?.removeEventListener("error", handleError);
};

const notifySubscribers = <E extends TEventNames>(
  event: E,
  data: TEventDataTypes[E]
) => {
  subscribers[event].forEach((s) => s(data));
};

const handleOpen = () => {
  notifySubscribers("status-changed", "ready");
};

const handleClose = () => {
  notifySubscribers("status-changed", "pending");
  setTimeout(createChannel, RECONNECT_DELAY);
};

const handleError = () => {
  notifySubscribers("status-changed", "error");
  console.error("REFRESH PAGE");
};

const handleMessage = (e: MessageEvent<string>) => {
  const messages = JSON.parse(e.data);
  notifySubscribers("message-received", messages);
};

class ChatAPI {
  start() {
    createChannel();
  }

  stop() {
    const events = Object.keys(subscribers) as (keyof TSubscribers)[];
    events.forEach((k) => (subscribers[k] = []));

    ws?.close();
    cleanUp();
  }

  subscribe<E extends TEventNames>(eventName: E, callback: TSubscriber<E>) {
    subscribers[eventName].push(callback);
  }

  unsubscribe<E extends TEventNames>(eventName: E, callback: TSubscriber<E>) {
    subscribers[eventName] = subscribers[eventName].filter(
      (s) => s !== callback
    ) as TSubscribers[E];
  }

  sendMessage(message: string) {
    ws?.send(message);
  }
}

export const chatAPI = new ChatAPI();
