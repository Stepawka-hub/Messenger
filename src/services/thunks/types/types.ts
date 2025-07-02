import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { TChatMessage, TSocketStatus } from "@types";

export type ThunkAppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export type TNewMessageHandler = ((messages: TChatMessage[]) => void) | null;
export type TStatusChangedHandler = ((status: TSocketStatus) => void) | null;
