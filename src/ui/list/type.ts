import { ReactNode } from "react";

export type ListProps<T> = {
  items: T[];
  renderItem: (item: T, key?: number) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  emptyContent?: ReactNode;
  classes?: {
    list?: string;
    noData?: string;
  };
  customLoader?: ReactNode;
};
