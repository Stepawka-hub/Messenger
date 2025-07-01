import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { TWebSocketState, WebSocketProviderProps } from "./types";
import { WebSocketContext } from "./websocket-context";
import { WS_CODES, WS_URL } from "./constants";

export const WebSocketProvider: FC<
  PropsWithChildren<WebSocketProviderProps>
> = ({ children, url = WS_URL }) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsRef.current = new WebSocket(url);
    const socket = wsRef.current;

    const handleOpen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    const handleClose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
      wsRef.current = null;
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      wsRef.current = null;
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("close", handleClose);
    socket.addEventListener("error", handleError);

    return () => {
      if (socket) {
        socket.removeEventListener("open", handleOpen);
        socket.removeEventListener("close", handleClose);
        socket.removeEventListener("error", handleError);

        if (socket.readyState === WS_CODES.OPEN) {
          socket.close();
        }
      }
    };
  }, [url]);

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
