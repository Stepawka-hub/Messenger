import { dialogsAPI } from "@api/dialogs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TDialog, TUserId } from "@types";

const GET_DIALOGS = "dialogs/getAll";
const START_DIALOG = "dialogs/start";

export const getDialogsAsync = createAsyncThunk<TDialog[]>(
  GET_DIALOGS,
  async (_, { rejectWithValue }) => {
    try {
      return await dialogsAPI.getDialogs();
    } catch (err) {
      return rejectWithValue(err || "Failed to get dialogs");
    }
  }
);

export const startDialogAsync = createAsyncThunk<void, TUserId>(
  START_DIALOG,
  async (userId) => {
    await dialogsAPI.startDialog(userId);
  }
);
