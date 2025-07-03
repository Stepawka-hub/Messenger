import { Message } from "@components/common-chat";
import { TSendMessageForm } from "@components/send-message-form/types";
import { getMessages } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync, sendMessageAsync } from "@thunks/dialogs";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { PrivateChatProps } from "./type";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
  };

  useEffect(() => {
    dispatch(getMessagesAsync(userId));
  }, [dispatch, userId]);

  return (
    <ChatWrapper handleSendMessage={onSubmit}>
      <List>
        {messages.map(({ id, body, senderName }) => (
          <Message key={id} content={body} username={senderName} photo="" />
        ))}
      </List>
    </ChatWrapper>
  );
};
