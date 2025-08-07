import { ScrollController, TSocketStatus } from "@types";

export type MessageListProps = ScrollController & {
  status: TSocketStatus;
};
