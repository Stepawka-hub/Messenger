import { Message } from "@components/chatting";
import { useFetchMessages } from "@hooks/useFetchMessages";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";
import { getCurrentUser } from "@slices/auth";
import { useSelector } from "@store";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { formatDateShort } from "@utils/helpers/date";
import { isSameDay } from "date-fns";
import { FC, Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import s from "./message-list.module.css";
import { MessageListProps } from "./type";

export const MessageList: FC<MessageListProps> = ({
  userId,
  partnerAvatar,
  bottomListRef,
}) => {
  const currentUser = useSelector(getCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 760 });
  const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
    userId,
  });

  // Scroll logic
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const loadMoreRef = useInfiniteScroll({ loadMore: fetchMessages, hasMore });

  useEffect(() => {
    const bottomRef = bottomListRef.current;
    if (bottomRef && messages.length > 0 && isFirstLoad) {
      bottomRef.scrollIntoView({
        block: "nearest",
      });
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad, bottomListRef]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [userId]);

  if (!messages.length && !hasMore) {
    return <NoDataFound label="Список сообщений пуст" className={s.noData} />;
  }

  const messageElements = messages.map((m, index) => {
    const isMessageOwner = m.senderId === currentUser?.id;
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showSeparator =
      index === 0 ||
      (prevMessage && !isSameDay(prevMessage.addedAt, m.addedAt));

    return (
      <Fragment key={m.id}>
        {showSeparator && (
          <div className={s.separator}>{formatDateShort(m.addedAt)}</div>
        )}
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
      </Fragment>
    );
  });

  return (
    <section className={s.list}>
      {isLoading && <Loader />}
      {hasMore && <div className={s.loadMore} ref={loadMoreRef} />}
      {messageElements}
      <div ref={bottomListRef}></div>
    </section>
  );
};
