import { TSocketStatus } from '@types';
import { RefObject } from "react";

export type MessageListProps = {
  status: TSocketStatus;
  bottomListRef: RefObject<HTMLDivElement | null>;
};
