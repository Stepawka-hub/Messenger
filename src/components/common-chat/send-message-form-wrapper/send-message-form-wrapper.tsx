import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { SendMessageForm, TSendMessageForm } from "@components/chat";
import { sendMessage } from "@services/socket";
import { getIsSendingMessage } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { SendMessageFormWrapperProps } from "./type";

export const SendMessageFormWrapper: FC<SendMessageFormWrapperProps> = ({
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const isSendingMessage = useSelector(getIsSendingMessage);

  const onSubmit: SubmitHandler<TSendMessageForm> = async ({ message }) => {
    try {
      dispatch(sendMessage(message));
      onSuccess?.();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />;
};
