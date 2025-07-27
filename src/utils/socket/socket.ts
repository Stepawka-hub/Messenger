import { TChatMessage } from "@types";

export class Socket {
  private socket: WebSocket | null;

  constructor() {
    this.socket = null;
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

  send(message: TChatMessage) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }
}
