import { Message } from "@components/message";
import { TSendMessageForm } from "@components/send-message-form/types";
import { getSelectedDialog } from "@selectors/dialogs";
import { getCurrentUser } from "@slices/auth";
import {
  getIsLoadingMessages,
  getIsSendingMessage,
  getMessages,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync, sendMessageAsync } from "@thunks/dialogs";
import { TMessage } from "@types";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import s from "./private-chat.module.css";
import { PrivateChatProps } from "./type";
import { SendMessageForm } from "@components/send-message-form";
import { ChatHeader } from "../chat-header";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const selectedDialog = useSelector((state) =>
    getSelectedDialog(state, userId)
  );
  const messages = useSelector(getMessages);

  const isSendingMessage = useSelector(getIsSendingMessage);
  const isLoading = useSelector(getIsLoadingMessages);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    dispatch(getMessagesAsync(userId));
  }, [dispatch, userId]);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
  };

  const renderMessage = ({ id, body, senderName, senderId }: TMessage) => {
    const isMessageOwner = senderId === currentUser?.id;
    return (
      <Message
        key={id}
        senderId={senderId}
        content={body}
        username={senderName}
        photo={
          isMessageOwner
            ? currentUser.photos?.small
            : selectedDialog?.photos.small
        }
        isOwnMessage={isMessageOwner}
        isMobile={isMobile}
      />
    );
  };

  return (
    <ChatWrapper
      header={
        <ChatHeader
          userId={userId}
          username={selectedDialog?.userName}
          avatar={selectedDialog?.photos.small || null}
        />
      }
      body={
        <List
          items={messages}
          renderItem={renderMessage}
          isLoading={isLoading}
          classes={{ list: s.list }}
          emptyMessage="Список сообщений пуст"
        />
      }
      footer={
        <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />
      }
    />
  );
};
