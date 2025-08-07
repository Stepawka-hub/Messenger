import { FC, memo } from "react";
import { MessagesContainerProps } from "./types";
import { NoDataFound } from "@ui/no-data-found";
import { Loader } from "@ui/loader";
import { useInitialScroll } from "@hooks";
import s from "./messages-container.module.css";

export const MessagesContainer: FC<MessagesContainerProps> = memo(({
  messages,
  isLoading = false,
  hasMore = false,
  loadMoreRef,
  chatId,
  bottomListRef,
  scrollToBottom,
}) => {
  useInitialScroll({
    elements: messages,
    scrollToBottom,
    chatId,
  });

  if (!messages.length && !isLoading && !hasMore) {
    return (
      <NoDataFound
        label="Список сообщений пуст"
        classes={{ container: s.noData }}
      />
    );
  }

  //console.log(messages, isLoading, hasMore, loadMoreRef, chatId, bottomListRef, scrollToBottom);

  return (
    <section className={s.list}>
      {isLoading && <Loader />}
      {hasMore && <div className={s.loadMore} ref={loadMoreRef} />}
      {messages}
      <div className={s.bottomList} ref={bottomListRef} />
    </section>
  );
});
