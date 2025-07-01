import { RECONNECT_DELAY, WS_URL } from "./constants";
import { TSubscriber } from "./types";

let ws: WebSocket | null = null;
let subscribers: TSubscriber[] = [];

const createChannel = () => {
  ws?.removeEventListener("close", handleClose);
  ws?.close();
  ws = new WebSocket(WS_URL);
  ws.addEventListener("close", handleClose);
  ws.addEventListener("message", handleMessage);
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
  start() {
    createChannel();
  }

  stop() {
    subscribers = [];
    ws?.close();
    ws?.removeEventListener("close", handleClose);
    ws?.removeEventListener("message", handleMessage);
  }

  subscribe(callback: TSubscriber) {
    subscribers.push(callback);
  }

  unsubscribe(callback: TSubscriber) {
    subscribers = subscribers.filter((s) => s !== callback);
  }

  sendMessage(message: string) {
    ws?.send(message);
  }
}

export const chatAPI = new ChatAPI();
