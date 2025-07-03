import { TChatMessage } from "@types";
import { SubmitHandler } from "react-hook-form";
import { TSendMessageForm } from "../send-message-form/types";

export type ChatWrapperProps = {
  messages: TChatMessage[];
  handleSendMessage: SubmitHandler<TSendMessageForm>;
};
