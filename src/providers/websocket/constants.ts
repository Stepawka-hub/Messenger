export const WS_URL: string = import.meta.env.VITE_WS_API_URL;

export const WS_CODES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export const RECONNECT_DELAY = 3000;