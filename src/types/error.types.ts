export const ErrorType = {
  TOAST: "TOAST",
  INLINE: "INLINE",
  NONE: "NONE",
} as const;

export type TErrorPayload = {
  message: string;
  type: keyof typeof ErrorType;
};
