import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { SendMessageForm, TSendMessageForm } from "@components/chat";
import { sendMessage } from "@services/socket";
import { useDispatch } from "@store";
import { SendMessageFormWrapperProps } from "./type";
import { MAX_CHAT_MESSAGE_LENGTH } from "@utils/constants";

export const SendMessageFormWrapper: FC<SendMessageFormWrapperProps> = ({
  status,
  scrollToBottom,
}) => {
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<TSendMessageForm> = async ({ message }) => {
    dispatch(sendMessage(message));
  };

  return (
    <SendMessageForm
      maxLength={MAX_CHAT_MESSAGE_LENGTH}
      disabled={status !== "ready"}
      onSubmit={onSubmit}
    />
  );
};
