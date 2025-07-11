import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import clsx from "clsx";
import s from "./list.module.css";
import { ListProps } from "./type";

export const List = <T,>({
  items,
  renderItem,
  classes,
  isLoading = false,
  emptyMessage = "Список пуст",
  customLoader = <Loader />
}: ListProps<T>) => {
  if (isLoading) {
    return customLoader;
  }

  if (!items || items.length === 0) {
    return (
      <NoDataFound
        label={emptyMessage}
        className={clsx(s.noData, classes?.noData)}
      />
    );
  }

  return (
    <section className={clsx(s.list, classes?.list)}>
      {items.map((item, index) => renderItem(item, index))}
    </section>
  );
};
