import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { TErrorPayload } from "@types";

export type ThunkAppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
export type TBaseRejectValue = {
  rejectValue: TErrorPayload;
};
