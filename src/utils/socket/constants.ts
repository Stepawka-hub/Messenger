export const WS_URL: string = import.meta.env.VITE_WS_API_URL;

export const WS_CODES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as const;

export const BASE_RECONNECT_DELAY = 5000;
export const MAX_RECONNECT_DELAY = 30000;
export const LINEAR_STEP = Math.floor(BASE_RECONNECT_DELAY / 2);

// Макс. количество попыток для того, чтобы не пересчитывать линейный рост
export const MAX_LINEAR_ATTEMPTS = Math.ceil(
  (MAX_RECONNECT_DELAY - BASE_RECONNECT_DELAY) / LINEAR_STEP
);
