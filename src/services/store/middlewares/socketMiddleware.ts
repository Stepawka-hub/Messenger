import { addMessages, setMessages, setStatus } from "@slices/common-chat";
import { AppMiddleware } from "@store";
import { TCommonChatMessage } from "@types";
import { Socket, WS_URL } from "@utils/socket";
import {
  isWhitelistedAction,
  sendMessage,
  socketConnect,
  socketDisconnect,
} from "@services/socket";
import { addToast } from "@slices/toast";

export const socketMiddleware =
  (socket: Socket): AppMiddleware =>
  (params) =>
  (next) => {
    const { dispatch } = params;

    const handleOpen = () => {
      dispatch(setMessages([]));
      dispatch(setStatus("ready"));
    };

    const handleClose = () => {
      dispatch(setStatus("pending"));
      dispatch(
        addToast({
          type: "error",
          content: "Соединение прервано! Переподключение...",
        })
      );
    };

    const handleError = () => {
      dispatch(setStatus("error"));
    };

    const handleRecievedMessage = (e: MessageEvent<string>) => {
      const messages: TCommonChatMessage[] = JSON.parse(e.data);
      dispatch(addMessages(messages));
    };

    return (action) => {
      if (isWhitelistedAction(action)) {
        switch (action.type) {
          case socketConnect.type:
            dispatch(setStatus("pending"));

            socket.connect(WS_URL);

            socket.on("open", handleOpen);
            socket.on("message", handleRecievedMessage);
            socket.on("close", handleClose);
            socket.on("error", handleError);
            break;

          case sendMessage.type:
            socket.send(action.payload);
            break;

          case socketDisconnect.type:
            socket.off("open", handleOpen);
            socket.off("message", handleRecievedMessage);
            socket.off("close", handleClose);
            socket.off("error", handleError);
            socket.disconnect();
            break;

          default:
            break;
        }
      }

      return next(action);
    };
  };
