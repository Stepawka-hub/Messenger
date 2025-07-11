import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TToast, TToastId, TToastWithKey } from "@types";
import { nanoid } from "nanoid";
import { TToastState } from "./types";

const initialState: TToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: {
      reducer: (state, { payload }: PayloadAction<TToastWithKey>) => {
        state.toasts.push(payload);
      },
      prepare: (toast: TToast) => {
        const id = nanoid();
        return { payload: { ...toast, id } };
      },
    },
    removeToast: (state, { payload }: PayloadAction<TToastId>) => {
      state.toasts = state.toasts.filter((t) => t.id !== payload);
    },
  },
  selectors: {
    getToasts: (state) => state.toasts,
  },
});

export const reducer = toastSlice.reducer;
export const { addToast, removeToast } = toastSlice.actions;
export const { getToasts } = toastSlice.selectors;
