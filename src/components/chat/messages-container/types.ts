import { ScrollController } from '@types';
import { ReactNode } from "react";

export type MessagesContainerProps = ScrollController & {
  messages: ReactNode[];
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  chatId?: number;
};
