import { CommonChat, DialogList, PrivateChat } from "@components/dialogs";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { DialogsLayout } from "@components/layouts";
import { useMediaQuery } from "react-responsive";
import s from "./dialogs-page.module.css";

const DialogsPage: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { userId } = useParams<{ userId?: string }>();
  const isCommonChat = userId === "common";

  const ChatComponent = isCommonChat ? (
    <CommonChat />
  ) : (
    <PrivateChat userId={Number(userId)} />
  );

  if (isMobile) {
    return (
      <DialogsLayout>{!userId ? <DialogList /> : ChatComponent}</DialogsLayout>
    );
  }

  return (
    <DialogsLayout>
      <div className={s.content}>
        <div className={s.dialogs}>
          <DialogList />
        </div>
        <div className={s.chat}>
          {!userId ? (
            <div className={s.selectChat}>Выберите чат</div>
          ) : (
            ChatComponent
          )}
        </div>
      </div>
    </DialogsLayout>
  );
};

export default DialogsPage;
