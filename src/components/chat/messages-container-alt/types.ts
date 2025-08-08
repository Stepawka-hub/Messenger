import { ScrollController } from "@types";
import { ReactNode } from "react";

export type MessagesContainerAltProps = Pick<ScrollController, "bottomListRef"> & {
  dataLength: number;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  renderItem: (index: number) => ReactNode;
};
