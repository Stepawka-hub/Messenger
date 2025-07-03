import { TDialog } from "@types";

export type DialogProps = Omit<
  TDialog,
  "lastDialogActivityDate" | "lastUserActivityDate"
>;
