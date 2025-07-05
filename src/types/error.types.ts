export const ErrorType = {
  TOAST: "TOAST",
  INLINE: "INLINE",
  NONE: "NONE",
} as const;

export type ErrorTypeValue = keyof typeof ErrorType;

export type TErrorPayload = {
  message: string;
  type: ErrorTypeValue;
};

export type TErrorWithMessage = {
  message: string;
};

export type TErrorMessage = string | null;
