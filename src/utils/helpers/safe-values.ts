export const getSafeValue =
  <T>(safeValue: T) =>
  (value: T) =>
    value || safeValue;

export const isReadySocketData = <T>(message: T) =>
  message instanceof Blob ||
  message instanceof ArrayBuffer ||
  typeof message === "string";
