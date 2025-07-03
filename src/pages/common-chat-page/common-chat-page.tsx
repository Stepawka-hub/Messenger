import { ChatWrapper } from "@components/common-chat";
import { TSendMessageForm } from "@components/common-chat/send-message-form/types";
import { getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import {
  sendMessageAsync,
  startMessagesListening,
  stopMessagesListening,
} from "@thunks/chat";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

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
      <ChatWrapper messages={messages} handleSendMessage={onSubmit} />
    </PageWrapper>
  );
};
