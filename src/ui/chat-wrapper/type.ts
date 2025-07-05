import { SubmitHandler } from "react-hook-form";
import { TSendMessageForm } from "@components/send-message-form/types";

export type ChatWrapperProps = {
  className?: string;
  handleSendMessage: SubmitHandler<TSendMessageForm>;
};
