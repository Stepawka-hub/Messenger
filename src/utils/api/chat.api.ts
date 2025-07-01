import { RECONNECT_DELAY, WS_URL } from "./constants";
import { TSubscriber } from "./types";

let ws: WebSocket;
let subscribers: TSubscriber[] = [];

const createChannel = () => {
  ws?.removeEventListener("close", handleClose);
  ws?.close();
  ws = new WebSocket(WS_URL);
  ws.addEventListener("close", handleClose);
};

const handleClose = () => {
  console.log("Close WS");
  setTimeout(createChannel, RECONNECT_DELAY);
};

const handleMessage = (e: MessageEvent<string>) => {
  const messages = JSON.parse(e.data);
  subscribers.forEach((s) => s(messages));
};

class ChatAPI {
  subscribe(callback: TSubscriber) {
    subscribers.push(callback);
  }

  unsubscribe(callback: TSubscriber) {
    subscribers = subscribers.filter((s) => s !== callback);
  }
}

export const chatAPI = new ChatAPI();
