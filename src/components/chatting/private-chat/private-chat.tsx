import { MessageList, SendMessageForm } from "@components/chatting";
import { TSendMessageForm } from "@components/chatting/send-message-form/types";
import { getSelectedDialog } from "@selectors/dialogs";
import { getIsSendingMessage, moveSelectedDialogToTop } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { sendMessageAsync } from "@thunks/dialogs";
import { ChatHeader } from "@ui/chat-header";
import { ChatWrapper } from "@ui/chat-wrapper";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { PrivateChatProps } from "./type";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const isSendingMessage = useSelector(getIsSendingMessage);
  const selectedDialog = useSelector(getSelectedDialog);

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
    dispatch(moveSelectedDialogToTop());
  };

  if (!selectedDialog) {
    return null;
  }

  return (
    <ChatWrapper
      header={
        <ChatHeader
          userId={userId}
          username={selectedDialog?.userName}
          lastUserActivityDate={selectedDialog.lastUserActivityDate}
          avatar={selectedDialog?.photos.small || null}
        />
      }
      body={
        <MessageList
          userId={userId}
          partnerAvatar={selectedDialog.photos.small}
        />
      }
      footer={
        <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />
      }
    />
  );
};
