import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { sendMessage } from "@services/socket";
import { useDispatch } from "@store";
import { ChatWrapper } from "@ui/chat-wrapper";
import { MessageList } from "@components/common-chat";
import { SendMessageForm, TSendMessageForm } from "@components/chat";

export const CommonChat: FC = () => {
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessage(message));
  };

  return (
    <ChatWrapper
      body={<MessageList />}
      footer={<SendMessageForm onSubmit={onSubmit} />}
    />
  );
};
