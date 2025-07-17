import { createSelector } from "@reduxjs/toolkit";
import { getDialogs, getSelectedDialogId } from "@slices/dialogs";

export const getSelectedDialog = createSelector(
  [getDialogs, getSelectedDialogId],
  (dialogs, id) => dialogs.find((d) => d.id === id)
);
