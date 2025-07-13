import { Message } from "@components/chatting/message";
import { TSendMessageForm } from "@components/chatting/send-message-form/types";
import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import {
  sendMessageAsync,
  startMessagesListening,
  stopMessagesListening,
} from "@thunks/chat";
import { TChatMessage } from "@types";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import s from "./common-chat-page.module.css";
import { SendMessageForm } from "@components/chatting/send-message-form";

export const CommonChatPage: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync(message));
  };

  const renderMessage = (
    { userId, userName, message, photo }: TChatMessage,
    key?: number
  ) => (
    <Message
      key={key}
      senderId={userId}
      username={userName}
      content={message}
      photo={photo}
      isOwnMessage={currentUser?.id === userId}
      hideInfo
    />
  );

  return (
    <PageWrapper
      pageTitle="Общий чат"
      title="Общий чат"
      description="Общий чат для общения"
    >
      <ChatWrapper
        className={s.chatWrapper}
        body={
          <List
            items={messages}
            renderItem={renderMessage}
            emptyMessage="Список сообщений пуст"
            classes={{ list: s.list }}
          />
        }
        footer={<SendMessageForm onSubmit={onSubmit} />}
      />
    </PageWrapper>
  );
};
