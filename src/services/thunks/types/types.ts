import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export type ThunkAppDispatch = ThunkDispatch<unknown, unknown, UnknownAction>;
