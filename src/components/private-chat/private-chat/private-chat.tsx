import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "@store";
import { getSelectedDialog } from "@selectors/dialogs";
import { getDialogsAsync } from "@thunks/dialogs";
import { PrivateChatProps } from "./type";
import { StartDialogButton } from "@components/chat";
import { SendMessageFormWrapper, MessageList } from "@components/private-chat";
import { Button } from "@ui/button";
import { ChatHeader } from "@ui/chat-header";
import { ChatWrapper } from "@ui/chat-wrapper";
import { ChatStub } from "@ui/chat-stub";
import clsx from "clsx";
import s from "./private-chat.module.css";

export const PrivateChat: FC<PrivateChatProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDialog = useSelector((state) =>
    getSelectedDialog(state, userId)
  );
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

  const onSendMessage = () => {
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
        <SendMessageFormWrapper userId={userId} onSuccess={onSendMessage} />
      }
    />
  );
};
