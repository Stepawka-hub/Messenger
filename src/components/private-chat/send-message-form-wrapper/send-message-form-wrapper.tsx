import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "@store";
import { SendMessageFormWrapperProps } from "./type";
import { SendMessageForm, TSendMessageForm } from "@components/chat";
import {
  getIsSendingMessage,
  moveDialogToTop,
  setDialogActivityDate,
} from "@slices/dialogs";
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
      dispatch(
        setDialogActivityDate({
          dialogId: userId,
          date: new Date().toISOString(),
        })
      );
      onSuccess();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />;
};
