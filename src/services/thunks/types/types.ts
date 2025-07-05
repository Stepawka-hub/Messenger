import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { TChatMessage, TErrorPayload, TSocketStatus } from "@types";

export type ThunkAppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export type TBaseRejectValue = {
  rejectValue: TErrorPayload;
};
export type TRejectWithValueFn = (value: unknown) => unknown;

export type TNewMessageHandler = ((messages: TChatMessage[]) => void) | null;
export type TStatusChangedHandler = ((status: TSocketStatus) => void) | null;
