import { MessageList, SendMessageForm } from "@components/dialogs";
import { FC } from "react";
import { ChatWrapperProps } from "./type";
import s from "./chat-wrapper.module.css";

export const ChatWrapper: FC<ChatWrapperProps> = ({
  messages,
  handleSendMessage,
}) => {
  return (
    <div className={s.wrapper}>
      <MessageList messages={messages} />
      <SendMessageForm onSubmit={handleSendMessage} />
    </div>
  );
};
