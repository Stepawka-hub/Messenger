import { ScrollController, TUserId } from "@types";

export type MessageListProps = ScrollController & {
  userId: TUserId;
  partnerAvatar: string | null;
};
