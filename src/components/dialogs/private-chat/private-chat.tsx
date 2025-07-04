import { Message } from "@components/message";
import { TSendMessageForm } from "@components/send-message-form/types";
import { getIsLoadingMessages, getMessages } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync, sendMessageAsync } from "@thunks/dialogs";
import { TMessage } from "@types";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { PrivateChatProps } from "./type";
import s from "./private-chat.module.css";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const isLoading = useSelector(getIsLoadingMessages);

  useEffect(() => {
    dispatch(getMessagesAsync(userId));
  }, [dispatch, userId]);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
  };

  const renderMessage = (message: TMessage) => (
    <Message
      key={message.id}
      content={message.body}
      username={message.senderName}
      photo=""
    />
  );

  return (
    <ChatWrapper handleSendMessage={onSubmit}>
      <List
        items={messages}
        renderItem={renderMessage}
        isLoading={isLoading}
        classes={{ list: s.list }}
        emptyMessage="Список сообщений пуст"
      />
    </ChatWrapper>
  );
};
