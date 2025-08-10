import { ScrollToOptions } from "@tanstack/react-virtual";
import { ReactNode, RefObject } from "react";

export type MessagesContainerProps = {
  dataLength: number;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: RefObject<HTMLDivElement | null>;
  resetScrollKey?: number;
  renderItem: (index: number) => ReactNode;
};

export type TMessagesContainerRef = {
  scrollToBottom: TScrollToBottom;
  scrollToIndex: TScrollToIndex;
};

export type TScrollToBottom = () => void;
export type TScrollToIndex = (i: number, o?: ScrollToOptions) => void;

export type TMessagesContainer = RefObject<TMessagesContainerRef | null>;
