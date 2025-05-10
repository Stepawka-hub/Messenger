import { createSlice } from "@reduxjs/toolkit";
import type { TAppState } from "./types";
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
    initializedSuccess: (state) => {
      state.initialized = true;
    },
    openModal: (state) => {
      state.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
    },
  },
  selectors: {
    getInitializedSelector: (state) => state.initialized,
    getModalSelector: (state) => state.modal,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.initialized = false;
      })
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(initializeApp.pending, (state) => {
        state.initialized = false;
      });
  },
});

export const reducer = appSlice.reducer;
export const { getInitializedSelector, getModalSelector } = appSlice.selectors;
