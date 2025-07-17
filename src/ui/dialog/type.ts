import { TDialog } from "@types";

export type DialogProps = Omit<
  TDialog,
  "lastUserActivityDate" | "hasNewMessages"
>;
