import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "@store";
import { SendMessageFormWrapperProps } from "./type";
import { SendMessageForm } from "../send-message-form";
import { TSendMessageForm } from "../send-message-form/types";
import { getIsSendingMessage, moveDialogToTop } from "@slices/dialogs";
import { sendMessageAsync } from "@thunks/dialogs";

export const SendMessageFormWrapper: FC<SendMessageFormWrapperProps> = ({
  userId,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const isSendingMessage = useSelector(getIsSendingMessage);

  const onSubmit: SubmitHandler<TSendMessageForm> = async ({ message }) => {
    try {
      await dispatch(sendMessageAsync({ userId, message })).unwrap();
      dispatch(moveDialogToTop(userId));
      onSuccess();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />;
};
