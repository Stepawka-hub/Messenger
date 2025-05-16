import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthUserDataAsync } from "./auth";

const INITIALIZE_APP = "app/init";

export const initializeApp = createAsyncThunk(
  INITIALIZE_APP,
  async (_, { dispatch }) => {
    const getAuthPromise = dispatch(getAuthUserDataAsync());
    await Promise.all([getAuthPromise]);
  }
);
