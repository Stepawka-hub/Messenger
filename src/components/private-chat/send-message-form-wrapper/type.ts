import { ScrollController } from "@types";

export type SendMessageFormWrapperProps = Pick<
  ScrollController,
  "scrollToBottom"
> & {
  userId: number;
};
