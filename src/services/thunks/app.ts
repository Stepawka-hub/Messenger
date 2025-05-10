import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthUserData } from "../auth/thunks";

const INITIALIZE_APP = "app/init";

export const initializeApp = createAsyncThunk(
  INITIALIZE_APP,
  async (_, { dispatch }) => {
    const getAuthPromise = dispatch(getAuthUserData());

    await Promise.all([getAuthPromise]);
  }
);
