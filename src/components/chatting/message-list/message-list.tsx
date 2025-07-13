import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "@store";
import { getIsLoadingMessages, getMessages } from "@slices/dialogs";
import { getCurrentUser } from "@slices/auth";
import { TMessage } from "@types";
import { useMediaQuery } from "react-responsive";
import { Message } from "@components/chatting";
import { List } from "@ui/list";
import { MessageListProps } from "./type";
import { getMessagesAsync } from "@thunks/dialogs";
import s from "./message-list.module.css";

export const MessageList: FC<MessageListProps> = memo(
  ({ userId, partnerAvatar }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const messages = useSelector(getMessages);
    const isLoading = useSelector(getIsLoadingMessages);
    const isMobile = useMediaQuery({ maxWidth: 600 });

    useEffect(() => {
      dispatch(getMessagesAsync(userId));
    }, [dispatch, userId]);

    const renderMessage = ({
      id,
      senderId,
      body,
      senderName,
      viewed,
      addedAt,
    }: TMessage) => {
      const isMessageOwner = senderId === currentUser?.id;
      return (
        <Message
          key={id}
          senderId={senderId}
          content={body}
          username={senderName}
          addedAt={addedAt}
          isViewed={viewed}
          photo={isMessageOwner ? currentUser.photos?.small : partnerAvatar}
          isOwnMessage={isMessageOwner}
          isMobile={isMobile}
        />
      );
    };

    return (
      <List
        items={messages}
        renderItem={renderMessage}
        isLoading={isLoading}
        classes={{ list: s.list }}
        emptyMessage="Список сообщений пуст"
      />
    );
  }
);
