import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { isSameDay } from "date-fns";
import { useDispatch, useSelector } from "@store";
import { getCurrentUser } from "@slices/auth";
import { useFetchMessages } from "@hooks/useFetchMessages";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";
import { ChatMessage } from "@components/chatting";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { formatDateShort } from "@utils/helpers/date";
import { MessageListProps } from "./type";
import { deleteMessageAsync, restoreMessageAsync } from "@thunks/dialogs";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { getDeletingMessageIds, getRestoringMessageIds } from "@slices/dialogs";
import s from "./message-list.module.css";

export const MessageList: FC<MessageListProps> = ({
  userId,
  partnerAvatar,
  bottomListRef,
}) => {
  console.log("MESSAGE LIST");
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 760 });
  const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
    userId,
  });
  const deletingMessageIds = useSelector(getDeletingMessageIds);
  const restoringMessageIds = useSelector(getRestoringMessageIds);

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

  const deleteMessage = useCallback(
    (messageId: string) => {
      dispatch(deleteMessageAsync(messageId));
    },
    [dispatch]
  );

  const restoreMessage = useCallback(
    (messageId: string) => {
      dispatch(restoreMessageAsync(messageId));
    },
    [dispatch]
  );

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
        <ChatMessage
          messageId={m.id}
          senderId={m.senderId}
          content={m.body}
          username={m.senderName}
          addedAt={m.addedAt}
          photo={isMessageOwner ? currentUser.photos?.small : partnerAvatar}
          isViewed={m.viewed}
          isDeleted={m.isDeleted}
          isDeleting={checkInProgress(deletingMessageIds, m.id)}
          isRestoring={checkInProgress(restoringMessageIds, m.id)}
          isOwnMessage={isMessageOwner}
          isMobile={isMobile}
          onRestore={restoreMessage}
          onDelete={deleteMessage}
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
