import {
  MessageList,
  SendMessageForm,
  StartDialogButton,
} from "@components/chatting";
import { TSendMessageForm } from "@components/chatting/send-message-form/types";
import { getSelectedDialog } from "@selectors/dialogs";
import { getIsSendingMessage, moveSelectedDialogToTop } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getDialogsAsync, sendMessageAsync } from "@thunks/dialogs";
import { ChatHeader } from "@ui/chat-header";
import { ChatWrapper } from "@ui/chat-wrapper";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { PrivateChatProps } from "./type";
import { ChatStub } from "../chat-stub";
import { Button } from "@ui/button";
import s from "./private-chat.module.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSendingMessage = useSelector(getIsSendingMessage);
  const selectedDialog = useSelector(getSelectedDialog);

  const openProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const refreshDialogs = () => {
    dispatch(getDialogsAsync());
  };

  const onSubmit: SubmitHandler<TSendMessageForm> = ({ message }) => {
    dispatch(sendMessageAsync({ userId, message }));
    dispatch(moveSelectedDialogToTop());
  };

  if (!selectedDialog) {
    return (
      <ChatStub>
        <span>Вы ещё не начинали диалог с этим пользователем</span>
        <div className={s.actions}>
          <Button
            className={clsx(s.button, s.openProfileBtn)}
            onClick={openProfile}
          >
            Открыть профиль
          </Button>
          <StartDialogButton
            userId={userId}
            className={clsx(s.button, s.startDialogBtn)}
            onSuccess={refreshDialogs}
          >
            Начать диалог
          </StartDialogButton>
        </div>
      </ChatStub>
    );
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
