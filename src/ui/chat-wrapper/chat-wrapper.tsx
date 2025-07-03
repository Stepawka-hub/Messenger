import { FC, PropsWithChildren } from "react";
import { ChatWrapperProps } from "./type";
import s from "./chat-wrapper.module.css";
import { SendMessageForm } from "@components/send-message-form";
import clsx from "clsx";

export const ChatWrapper: FC<PropsWithChildren<ChatWrapperProps>> = ({
  children,
  className,
  handleSendMessage,
}) => (
  <div className={clsx(s.wrapper, className)}>
    {children}
    <SendMessageForm onSubmit={handleSendMessage} />
  </div>
);
