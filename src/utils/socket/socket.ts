import { isReadySocketData } from "@utils/helpers";
import { WebSocketEvent, WebSocketEventListener } from "./types";

export class Socket {
  private socket: WebSocket | null;

  constructor() {
    this.socket = null;
  }

  getReadyState() {
    return this.socket?.readyState;
  }

  connect(url: string) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  send<T>(message: T) {
    if (!this.socket) return;

    const data = isReadySocketData(message) ? message : JSON.stringify(message);
    this.socket.send(data);
  }

  on<T extends WebSocketEvent>(
    eventName: T,
    callback: WebSocketEventListener<T>
  ) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  off<T extends WebSocketEvent>(eventName: T, callback: WebSocketEventListener<T>) {
    if (this.socket) {
      this.socket.removeEventListener(eventName, callback);
    }
  }
}
