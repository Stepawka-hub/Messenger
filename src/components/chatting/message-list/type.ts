import { TUserId } from "@types";
import { RefObject } from "react";

export type MessageListProps = {
  userId: TUserId;
  partnerAvatar: string | null;
  bottomListRef: RefObject<HTMLDivElement | null>;
};
