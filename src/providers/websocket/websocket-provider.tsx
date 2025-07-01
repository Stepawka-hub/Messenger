import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { TWebSocketState, WebSocketProviderProps } from "./types";
import { WebSocketContext } from "./websocket-context";

const WS_URL = import.meta.env.VITE_WS_API_URL;

export const WebSocketProvider: FC<
  PropsWithChildren<WebSocketProviderProps>
> = ({ children, url = WS_URL }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);
    setWs(wsRef.current);
    const wsInstance = wsRef.current;

    const handleOpen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    const handleClose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
      setWs(null);
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      setWs(null);
    };

    wsInstance.addEventListener("open", handleOpen);
    wsInstance.addEventListener("close", handleClose);
    wsInstance.addEventListener("error", handleError);

    return () => {
      if (wsInstance) {
        wsInstance.removeEventListener("open", handleOpen);
        wsInstance.removeEventListener("close", handleClose);
        wsInstance.removeEventListener("error", handleError);
        wsInstance.close();
      }
    };
  }, [url]);

  const contextValue: TWebSocketState = {
    wsChannel: ws,
    isConnected,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
