import { DialogList, PrivateChat } from "@components/chatting";
import { ChatStub } from "@components/chatting/chat-stub";
import { DialogsLayout } from "@components/layouts";
import { setCurrentDialog } from "@slices/dialogs";
import { useDispatch } from "@store";
import { getDialogsAsync } from "@thunks/dialogs";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import s from "./dialogs-page.module.css";

const DialogsPage: FC = () => {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery({ minWidth: 1280 });
  const { userId } = useParams<{ userId?: string }>();

  useEffect(() => {
    dispatch(getDialogsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(setCurrentDialog(Number(userId)));
    }

    return () => {
      dispatch(setCurrentDialog(null));
    };
  }, [dispatch, userId]);

  if (!largeScreen) {
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
          {!userId ? <ChatStub /> : <PrivateChat userId={Number(userId)} />}
        </div>
      </div>
    </DialogsLayout>
  );
};

export default DialogsPage;
