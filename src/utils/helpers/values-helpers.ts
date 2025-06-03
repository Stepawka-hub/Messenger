export const getSafeValue =
  <T>(safeValue: T) =>
  (value: T) =>
    value || safeValue;
