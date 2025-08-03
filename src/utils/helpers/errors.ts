import { ErrorTypeValue, TErrorPayload, TErrorWithMessage } from "@types";

const isErrorWithMessage = (error: unknown): error is TErrorWithMessage =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof (error as Record<string, unknown>).message === "string";

const toErrorWithMessage = (maybeError: unknown): TErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown) =>
  toErrorWithMessage(error).message;

type TCreateErrorPayloadArgs = {
  message?: string;
  type?: ErrorTypeValue;
};

export const createErrorPayload = ({
  message = "Произошла непредвиденная ошибка. Попробуйте позже.",
  type = "TOAST",
}: TCreateErrorPayloadArgs = {}): TErrorPayload => ({
  type,
  message,
});
