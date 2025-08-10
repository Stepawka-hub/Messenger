const HTML_UNESCAPE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
};

export const getSafeValue =
  <T>(safeValue: T) =>
  (value: T) =>
    value || safeValue;

export const isReadySocketData = <T>(message: T) =>
  message instanceof Blob ||
  message instanceof ArrayBuffer ||
  typeof message === "string";

export const unescapeHtml = (text: string) =>
  text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => HTML_UNESCAPE_MAP[m]);
