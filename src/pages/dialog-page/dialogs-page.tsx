import { DialogList, PrivateChat } from "@components/dialogs";
import { DialogsLayout } from "@components/layouts";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import s from "./dialogs-page.module.css";

const DialogsPage: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 992 });
  const { userId } = useParams<{ userId?: string }>();

  if (isMobile) {
    return (
      <DialogsLayout>
        {!userId ? <DialogList /> : <PrivateChat userId={Number(userId)} />}
      </DialogsLayout>
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
            <PrivateChat userId={Number(userId)} />
          )}
        </div>
      </div>
    </DialogsLayout>
  );
};

export default DialogsPage;
