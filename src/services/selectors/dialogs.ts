import { createSelector } from "@reduxjs/toolkit";
import { getDialogs } from "@slices/dialogs";
import { RootState } from "@store";

export const getSelectedDialog = createSelector(
  [getDialogs, (_: RootState, id: number) => id],
  (dialogs, id) => dialogs.find((d) => d.id === id)
);
