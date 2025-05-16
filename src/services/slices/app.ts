import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAppState } from "./types";
import { initializeApp } from "@thunks/app";

const initialState: TAppState = {
  initialized: false,
  modal: {
    isOpen: false,
    title: "",
    text: "",
    delay: 3000,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsOpenModal: (state, { payload }: PayloadAction<boolean>) => {
      state.modal.isOpen = payload;
    },
  },
  selectors: {
    getInitialized: (state) => state.initialized,
    getModal: (state) => state.modal,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.initialized = false;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialized = false;
      });
  },
});

export const reducer = appSlice.reducer;
export const { getInitialized, getModal } = appSlice.selectors;
export const { setIsOpenModal } = appSlice.actions;
