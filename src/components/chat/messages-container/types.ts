import { ReactNode } from "react";

export type MessagesContainerProps = {
  messages: ReactNode[];
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  bottomListRef: React.RefObject<HTMLDivElement | null>;
};
