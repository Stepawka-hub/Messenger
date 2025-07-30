import { FC } from "react";
import { MessagesContainerProps } from "./types";
import { NoDataFound } from "@ui/no-data-found";
import { Loader } from "@ui/loader";
import s from "./messages-container.module.css";

export const MessagesContainer: FC<MessagesContainerProps> = ({
  messages,
  isLoading = false,
  hasMore = false,
  loadMoreRef,
  bottomListRef,
}) => {
  if (!messages.length && !isLoading && !hasMore) {
    return <NoDataFound label="Список сообщений пуст" className={s.noData} />;
  }

  return (
    <section className={s.list}>
      {isLoading && <Loader />}
      {hasMore && <div className={s.loadMore} ref={loadMoreRef} />}
      {messages}
      <div className={s.bottomList} ref={bottomListRef} />
    </section>
  );
};
