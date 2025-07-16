import { Message } from "@components/chatting";
import { useFetchMessages } from "@hooks/useFetchMessages";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";
import { getCurrentUser } from "@slices/auth";
import { useSelector } from "@store";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { formatRelativeDate } from "@utils/helpers/date";
import { isSameDay } from "date-fns";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MessageListProps } from "./type";
import s from "./message-list.module.css";

export const MessageList: FC<MessageListProps> = ({
  userId,
  partnerAvatar,
}) => {
  const currentUser = useSelector(getCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
    userId,
  });

  // Scroll logic
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const messageListRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useInfiniteScroll({ loadMore: fetchMessages, hasMore });

  useEffect(() => {
    const listRef = messageListRef.current;
    if (listRef && messages.length > 0 && isFirstLoad) {
      listRef.lastElementChild?.scrollIntoView();
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [userId]);

  if (!messages.length && !hasMore) {
    return <NoDataFound label="Список сообщений пуст" className={s.noData} />;
  }

  const messageElements = messages.map((m, index) => {
    const isMessageOwner = m.senderId === currentUser?.id;
    const next = index < messages.length - 1 ? messages[index + 1] : null;
    const showSeparator = next && !isSameDay(next.addedAt, m.addedAt);

    return (
      <Fragment key={m.id}>
        <Message
          senderId={m.senderId}
          content={m.body}
          username={m.senderName}
          addedAt={m.addedAt}
          isViewed={m.viewed}
          photo={isMessageOwner ? currentUser.photos?.small : partnerAvatar}
          isOwnMessage={isMessageOwner}
          isMobile={isMobile}
        />
        {showSeparator && (
          <div className={s.separator}>{formatRelativeDate(next.addedAt)}</div>
        )}
      </Fragment>
    );
  });

  return (
    <section className={s.list} ref={messageListRef}>
      {isLoading && <Loader />}
      {hasMore && <div className={s.loadMore} ref={loadMoreRef} />}
      {messageElements}
    </section>
  );
};
