import { Message } from "@components/message";
import { TSendMessageForm } from "@components/send-message-form/types";
import { getSelectedDialog } from "@selectors/dialogs";
import { getIsLoadingMessages, getMessages } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getMessagesAsync, sendMessageAsync } from "@thunks/dialogs";
import { TMessage } from "@types";
import { ChatWrapper } from "@ui/chat-wrapper";
import { List } from "@ui/list";
import { FC, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import s from "./private-chat.module.css";
import { PrivateChatProps } from "./type";
import { getCurrentUser } from "@slices/auth";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const dialog = useSelector((state) => getSelectedDialog(state, userId));
  const messages = useSelector(getMessages);
  const isLoading = useSelector(getIsLoadingMessages);

  useEffect(() => {
    dispatch(getMessagesAsync(userId));
  }, [dispatch, userId]);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
  };

  const renderMessage = ({ id, body, senderName, senderId }: TMessage) => (
    <Message
      key={id}
      content={body}
      username={senderName}
      photo={
        senderId === currentUser?.id
          ? currentUser.photos?.small
          : dialog?.photos.small
      }
    />
  );

  return (
    <ChatWrapper handleSendMessage={onSubmit}>
      <List
        items={messages}
        renderItem={renderMessage}
        isLoading={isLoading}
        classes={{ list: s.list }}
        emptyMessage="Список сообщений пуст"
      />
    </ChatWrapper>
  );
};
