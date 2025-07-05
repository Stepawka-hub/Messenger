import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthUserDataAsync } from "./auth";
import { TBaseRejectValue } from "./types";
import { createErrorPayload } from "@utils/helpers/error-helpers";

const INITIALIZE_APP = "app/initialize";

export const initializeApp = createAsyncThunk<void, void, TBaseRejectValue>(
  INITIALIZE_APP,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(getAuthUserDataAsync());
    } catch (err) {
      console.error("Error initializing app:", err);
      return rejectWithValue(
        createErrorPayload({
          message:
            "Не удалось инициализировать приложение. Попробуйте перезагрузить страницу.",
        })
      );
    }
  }
);
