import { addMessages, setMessages } from "@slices/common-chat";
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
  (next) => {
    const { dispatch } = params;

    const handleOpen = () => {
      dispatch(setMessages([]));
    };

    const handleClose = () => {};

    const handleRecievedMessage = (e: MessageEvent<string>) => {
      const messages: TChatMessage[] = JSON.parse(e.data);
      dispatch(addMessages(messages));
    };

    return (action) => {
      if (isWhitelistedAction(action)) {
        switch (action.type) {
          case socketConnect.type:
            socket.connect(WS_URL);

            socket.on("open", handleOpen);

            socket.on("message", handleRecievedMessage);

            socket.on("close", handleClose);
            break;

          case sendMessage.type:
            socket.send(action.payload);
            break;

          case socketDisconnect.type:
            socket.off("open", handleOpen);
            socket.off("message", handleRecievedMessage);
            socket.off("close", handleClose);
            socket.disconnect();
            break;

          default:
            break;
        }
      }

      return next(action);
    };
  };
