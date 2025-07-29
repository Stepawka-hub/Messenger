import { FC, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { isSameDay } from "date-fns";
import { ChatMessage } from "@components/private-chat";
import {
  useFetchMessages,
  useInfiniteScroll,
  useMessageActions,
  useScrollToBottom,
} from "@hooks";
import { getCurrentUser } from "@slices/auth";
import { getDeletingMessageIds, getRestoringMessageIds } from "@slices/dialogs";
import { useSelector } from "@store";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { formatDateShort } from "@utils/helpers/date";
import { MessageListProps } from "./type";
import { Separator } from "@ui/separator";
import { MessagesContainer } from "@components/chat";

export const MessageList: FC<MessageListProps> = ({
  userId,
  partnerAvatar,
  bottomListRef,
}) => {
  const currentUser = useSelector(getCurrentUser);
  const deletingMessageIds = useSelector(getDeletingMessageIds);
  const restoringMessageIds = useSelector(getRestoringMessageIds);

  const isMobile = useMediaQuery({ maxWidth: 760 });
  const { messages, hasMore, isLoading, fetchMessages } = useFetchMessages({
    userId,
  });
  const { deleteMessage, restoreMessage } = useMessageActions();

  // Scroll logic
  const loadMoreRef = useInfiniteScroll({ loadMore: fetchMessages, hasMore });
  useScrollToBottom({ bottomListRef });

  const messageElements = messages.map((m, index) => {
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
          onRestore={restoreMessage}
          onDelete={deleteMessage}
        />
      </Fragment>
    );
  });

  return (
    <MessagesContainer
      messages={messageElements}
      isLoading={isLoading}
      hasMore={hasMore}
      loadMoreRef={loadMoreRef}
      bottomListRef={bottomListRef}
    />
  );
};
