import { ScrollController, TSocketStatus } from "@types";

export type SendMessageFormWrapperProps = Pick<
  ScrollController,
  "scrollToBottom"
> & {
  status: TSocketStatus;
};
