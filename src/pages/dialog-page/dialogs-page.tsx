import { DialogList, PrivateChat } from "@components/chatting";
import { DialogsLayout } from "@components/layouts";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { getDialogsAsync } from "@thunks/dialogs";
import { useDispatch } from "@store";
import { setCurrentDialogId } from "@slices/dialogs";
import s from "./dialogs-page.module.css";

const DialogsPage: FC = () => {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery({ minWidth: 1280 });
  const { userId } = useParams<{ userId?: string }>();
  const userIdNumber = Number(userId);

  useEffect(() => {
    dispatch(getDialogsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentDialogId(userIdNumber));
  }, [dispatch, userIdNumber]);

  if (!largeScreen) {
    return (
      <DialogsLayout>
        {!userId ? <DialogList /> : <PrivateChat userId={userIdNumber} />}
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
            <PrivateChat userId={userIdNumber} />
          )}
        </div>
      </div>
    </DialogsLayout>
  );
};

export default DialogsPage;
