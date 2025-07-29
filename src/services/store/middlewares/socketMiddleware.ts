import { addMessages, setMessages } from "@slices/chat";
import { AppMiddleware } from "@store";
import { TChatMessage } from "@types";
import { Socket, WS_URL } from "@utils/socket";
import {
  isWhitelistedAction,
  sendMessage,
  socketConnect,
  socketDisconnect,
} from "@services/socket";

export const socketMiddleware =
  (socket: Socket): AppMiddleware =>
  (params) =>
  (next) =>
  (action) => {
    const { dispatch } = params;

    if (isWhitelistedAction(action)) {
      switch (action.type) {
        case socketConnect.type:
          socket.connect(WS_URL);

          socket.on("open", () => {
            console.log("OPEN");
            dispatch(setMessages([]));
          });

          socket.on("message", (e: MessageEvent<string>) => {
            console.log("MESSAGE RECIEVED");
            const messages: TChatMessage[] = JSON.parse(e.data);
            dispatch(addMessages(messages));
          });

          socket.on("close", () => {
            console.log("CLOSE");
          });
          break;

        case sendMessage.type:
          console.log("SEND");
          socket.send(action.payload);
          break;

        case socketDisconnect.type:
          console.log("DISCONNECT");
          socket.disconnect();
          break;

        default:
          break;
      }
    }

    return next(action);
  };
