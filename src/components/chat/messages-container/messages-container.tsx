import { FC, useEffect, useRef } from "react";
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
  scrollToBottom,
}) => {
  const isFirstLoad = useRef<boolean>(true);

  useEffect(() => {
    console.log(isFirstLoad.current);
    if (isFirstLoad.current && messages.length > 0) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    return () => {
      isFirstLoad.current = true;
    };
  }, []);

  if (!messages.length && !isLoading && !hasMore) {
    return (
      <NoDataFound
        label="Список сообщений пуст"
        classes={{ container: s.noData }}
      />
    );
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
