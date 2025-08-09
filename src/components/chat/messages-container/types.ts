import { ScrollToOptions } from "@tanstack/react-virtual";
import { ReactNode } from "react";

export type MessagesContainerProps = {
  dataLength: number;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  renderItem: (index: number) => ReactNode;
};

export type MessagesContainerRef = {
  scrollToBottom: () => void;
  scrollToIndex: TScrollToIndex;
};

export type TScrollToIndex = (i: number, o?: ScrollToOptions) => void;