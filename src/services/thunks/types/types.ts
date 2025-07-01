import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { TChatMessage } from "@types";

export type ThunkAppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export type TNewMessageHandler = ((messages: TChatMessage[]) => void) | null;
