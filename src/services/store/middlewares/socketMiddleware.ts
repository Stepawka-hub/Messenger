import { addMessages, setMessages, setStatus } from "@slices/common-chat";
import { AppMiddleware } from "@store";
import { TCommonChatMessage, TTimeout } from "@types";
import {
  BASE_RECONNECT_DELAY,
  LINEAR_STEP,
  MAX_LINEAR_ATTEMPTS,
  MAX_RECONNECT_DELAY,
  Socket,
  WS_CODES,
  WS_URL,
} from "@utils/socket";
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
    let reconnectAttempts = 0;
    let reconnectTimer: TTimeout | null = null;

    const cleanUp = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }

      socket.off("open", handleOpen);
      socket.off("message", handleRecievedMessage);
      socket.off("close", handleClose);
      socket.off("error", handleError);
      socket.disconnect();
    };

    const handleOpen = () => {
      dispatch(setMessages([]));
      dispatch(setStatus("ready"));
      reconnectAttempts = 0;
    };

    const handleClose = () => {
      if (socket.getReadyState() === WS_CODES.CLOSED) {
        cleanUp();

        const delay =
          reconnectAttempts > MAX_LINEAR_ATTEMPTS
            ? MAX_RECONNECT_DELAY
            : Math.min(
                BASE_RECONNECT_DELAY + reconnectAttempts * LINEAR_STEP,
                MAX_RECONNECT_DELAY
              );
        reconnectAttempts++;

        dispatch(setStatus("pending"));
        dispatch(
          addToast({
            type: "error",
            content: "Не удалось установить соединение! Переподключение...",
            options: {
              autoClose: BASE_RECONNECT_DELAY - 500,
              pauseOnFocusLoss: false,
              pauseOnHover: false,
            },
          })
        );

        reconnectTimer = setTimeout(() => {
          dispatch(socketConnect());
        }, delay);
      }
    };

    const handleError = (err: Event) => {
      dispatch(setStatus("error"));
      console.error("Socket encountered error: ", err, "Closing socket");
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
            cleanUp();
            break;

          default:
            break;
        }
      }

      return next(action);
    };
  };
