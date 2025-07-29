import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { SendMessageForm, TSendMessageForm } from "@components/chatting";
import { sendMessage } from "@services/socket";
import { useDispatch } from "@store";
import { ChatWrapper } from "@ui/chat-wrapper";
import { ChatMessageList } from "@components/chatting";

export const CommonChat: FC = () => {
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessage(message));
  };

  return (
    <ChatWrapper
      body={<ChatMessageList />}
      footer={<SendMessageForm onSubmit={onSubmit} />}
    />
  );
};
