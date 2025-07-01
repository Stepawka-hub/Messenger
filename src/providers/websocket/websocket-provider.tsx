import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TWebSocketState, WebSocketProviderProps } from "./types";
import { WebSocketContext } from "./websocket-context";
import { RECONNECT_DELAY, WS_CODES, WS_URL } from "./constants";

export const WebSocketProvider: FC<
  PropsWithChildren<WebSocketProviderProps>
> = ({ children, url = WS_URL }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const createChannel = useCallback(() => {
    wsRef.current = new WebSocket(url);
  }, [url]);

  useEffect(() => {
    createChannel();
    const socket = wsRef.current;

    const handleOpen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    const handleClose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
      wsRef.current = null;
      setTimeout(createChannel, RECONNECT_DELAY);
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      wsRef.current = null;
    };

    socket?.addEventListener("open", handleOpen);
    socket?.addEventListener("close", handleClose);
    socket?.addEventListener("error", handleError);

    return () => {
      socket?.removeEventListener("open", handleOpen);
      socket?.removeEventListener("close", handleClose);
      socket?.removeEventListener("error", handleError);

      if (socket?.readyState === WS_CODES.OPEN) {
        socket?.close();
      }
    };
  }, [createChannel]);

  const contextValue: TWebSocketState = {
    wsChannel: wsRef.current,
    isConnected,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
