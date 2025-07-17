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
import { Button } from "@ui/button";
import { ChatHeader } from "@ui/chat-header";
import { ChatWrapper } from "@ui/chat-wrapper";
import { FC, useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChatStub } from "../chat-stub";
import { PrivateChatProps } from "./type";
import s from "./private-chat.module.css";
import clsx from "clsx";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSendingMessage = useSelector(getIsSendingMessage);
  const selectedDialog = useSelector(getSelectedDialog);
  const bottomListRef = useRef<HTMLDivElement>(null);

  const openProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const refreshDialogs = () => {
    dispatch(getDialogsAsync());
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

  const onSubmit: SubmitHandler<TSendMessageForm> = async ({ message }) => {
    await dispatch(sendMessageAsync({ userId, message })).unwrap();
    dispatch(moveSelectedDialogToTop());
    bottomListRef.current?.scrollIntoView({
      block: "nearest",
    });
  };

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
          bottomListRef={bottomListRef}
        />
      }
      footer={
        <SendMessageForm disabled={isSendingMessage} onSubmit={onSubmit} />
      }
    />
  );
};
