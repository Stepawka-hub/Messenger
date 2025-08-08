import { FC, Fragment, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { isSameDay } from "date-fns";
import { ChatMessage } from "@components/private-chat";
import { useFetchMessages, useInfiniteScroll, useMessageActions } from "@hooks";
import { getCurrentUser } from "@slices/auth";
import { getDeletingMessageIds, getRestoringMessageIds } from "@slices/dialogs";
import { useSelector } from "@store";
import { checkInProgress, formatDateShort } from "@utils/helpers";
import { MessageListProps } from "./type";
import { Separator } from "@ui/separator";
import { useVirtualizer } from "@tanstack/react-virtual";
import s from "./messages-list.module.css";

// export const MessageList: FC<MessageListProps> = ({
//   userId,
//   partnerAvatar,
//   ...props
// }) => {
//   const currentUser = useSelector(getCurrentUser);
//   const deletingMessageIds = useSelector(getDeletingMessageIds);
//   const restoringMessageIds = useSelector(getRestoringMessageIds);
//   const isMobile = useMediaQuery({ maxWidth: 768 });

//   // Fetch messages
//   const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
//     userId,
//   });

//   // Message actions
//   const { deleteMessage, restoreMessage } = useMessageActions();

//   // Scroll logic
//   const loadMoreRef = useInfiniteScroll({ loadMore: fetchMessages, hasMore });

//   const messageElements = messages.map((m, index) => {
//     const isMessageOwner = m.senderId === currentUser?.id;
//     const prevMessage = index > 0 ? messages[index - 1] : null;
//     const showSeparator =
//       index === 0 ||
//       (prevMessage && !isSameDay(prevMessage.addedAt, m.addedAt));

//     return (
//       <Fragment key={m.id}>
//         {showSeparator && <Separator text={formatDateShort(m.addedAt)} />}
//         <ChatMessage
//           messageId={m.id}
//           senderId={m.senderId}
//           content={m.body}
//           username={m.senderName}
//           addedAt={m.addedAt}
//           photo={isMessageOwner ? currentUser.photos?.small : partnerAvatar}
//           isViewed={m.viewed}
//           isDeleted={m.isDeleted}
//           isDeleting={checkInProgress(deletingMessageIds, m.id)}
//           isRestoring={checkInProgress(restoringMessageIds, m.id)}
//           isOwnMessage={isMessageOwner}
//           isMobile={isMobile}
//           hideUserInfo={isMobile}
//           onRestore={restoreMessage}
//           onDelete={deleteMessage}
//         />
//       </Fragment>
//     );
//   });

//   return (
//     <MessagesContainer
//       messages={messageElements}
//       isLoading={isLoading}
//       hasMore={hasMore}
//       loadMoreRef={loadMoreRef}
//       chatId={userId}
//       {...props}
//     />
//   );
// };

export const MessageList: FC<MessageListProps> = ({
  userId,
  partnerAvatar,
}) => {
  const currentUser = useSelector(getCurrentUser);
  const deletingMessageIds = useSelector(getDeletingMessageIds);
  const restoringMessageIds = useSelector(getRestoringMessageIds);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Fetch messages
  const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
    userId,
  });

  // refs
  const bottomRef = useInfiniteScroll({
    loadMore: fetchMessages,
    hasMore,
    isLoading,
  });
  const scrollRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 100,
  });

  // // for scrolling
  // useEffect(() => {
  //   if (messages.length && scrollRef.current) {
  //     const { index, align } = scrollRef.current;
  //     virtualizer.scrollToIndex(index, { align });
  //   }
  // }, [virtualizer, messages.length]);

  // Message actions
  const { deleteMessage, restoreMessage } = useMessageActions();

  const renderMessage = (index: number) => {
    const m = messages[index];
    const isMessageOwner = m.senderId === currentUser?.id;
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showSeparator =
      index === 0 ||
      (prevMessage && !isSameDay(prevMessage.addedAt, m.addedAt));

    return (
      <Fragment key={m.id}>
        {showSeparator && <Separator text={formatDateShort(m.addedAt)} />}
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
          hideUserInfo={isMobile}
          onRestore={restoreMessage}
          onDelete={deleteMessage}
        />
      </Fragment>
    );
  };

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={scrollRef} className={s.list}>
      <div
        className={s.relative}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <div id="bottom" ref={bottomRef} />

        <div
          className={s.itemsContainer}
          style={{
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map(({ key, index }) => (
            <div
              className={s.item}
              key={key}
              data-index={index}
              ref={virtualizer.measureElement}
            >
              {renderMessage(index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
