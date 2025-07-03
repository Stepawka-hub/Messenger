import { FC, useEffect } from "react";
import { MessageList } from "../../common-chat/message-list";
import { SendMessageForm } from "../../common-chat/send-message-form";
import { SubmitHandler } from "react-hook-form";
import { TSendMessageForm } from "../../common-chat/send-message-form/types";
import { getMessagesAsync, sendMessageAsync } from "@thunks/dialogs";
import { useDispatch, useSelector } from "@store";
import { PrivateChatProps } from "./type";
import { getMessages } from "@slices/dialogs";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
  };

  useEffect(() => {
    dispatch(getMessagesAsync(userId));
  }, [dispatch, userId]);

  console.log(messages);

  return (
    <div>
      <MessageList messages={messages} />
      <SendMessageForm onSubmit={onSubmit} />
    </div>
  );
};
