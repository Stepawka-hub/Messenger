import { ReactNode } from "react";

export type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  classes?: {
    list?: string;
    noData?: string;
  };
  customLoader?: ReactNode;
};