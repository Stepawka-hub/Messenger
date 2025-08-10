import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { SendMessageForm, TSendMessageForm } from "@components/chat";
import { sendMessage } from "@services/socket";
import { useDispatch } from "@store";
import { SendMessageFormWrapperProps } from "./type";
import {
  MAX_CHAT_MESSAGE_LENGTH,
  MESSAGE_SCROLL_DELAY_MS,
} from "@utils/constants";

export const SendMessageFormWrapper: FC<SendMessageFormWrapperProps> = ({
  status,
  onSentMessage,
}) => {
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<TSendMessageForm> = async ({ message }) => {
    dispatch(sendMessage(message));

    // TODO: Заменить на механизм подтверждения доставки (BACKEND-123)
    // Временное решение из-за ограничений API
    setTimeout(() => {
      onSentMessage?.();
    }, MESSAGE_SCROLL_DELAY_MS);
  };

  return (
    <SendMessageForm
      maxLength={MAX_CHAT_MESSAGE_LENGTH}
      disabled={status !== "ready"}
      onSubmit={onSubmit}
    />
  );
};
