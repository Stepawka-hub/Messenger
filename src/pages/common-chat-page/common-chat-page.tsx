import { Message } from "@components/message";
import { TSendMessageForm } from "@components/send-message-form/types";
import { getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import {
  sendMessageAsync,
  startMessagesListening,
  stopMessagesListening,
} from "@thunks/chat";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import s from './common-chat-page.module.css';

export const CommonChatPage: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync(message));
  };

  return (
    <PageWrapper
      pageTitle="Общий чат"
      title="Общий чат"
      description="Общий чат для общения"
    >
      <ChatWrapper className={s.chatWrapper} handleSendMessage={onSubmit}>
        <List>
          {messages.map(({ id, userName, message, photo }) => (
            <Message
              key={id}
              username={userName}
              content={message}
              photo={photo}
            />
          ))}
        </List>
      </ChatWrapper>
    </PageWrapper>
  );
};
