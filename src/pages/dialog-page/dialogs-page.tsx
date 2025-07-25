import { DialogList, PrivateChat } from "@components/chatting";
import { ChatStub } from "@ui/chat-stub";
import { DialogsLayout } from "@components/layouts";
import {
  getIsLoadingDialogs,
  setCurrentDialog,
  setDialogsPage,
} from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { getDialogsAsync } from "@thunks/dialogs";
import { FC, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Loader } from "@ui/loader";
import s from "./dialogs-page.module.css";

export const DialogsPage: FC = () => {
  const dispatch = useDispatch();
  const largeScreen = useMediaQuery({ minWidth: 1280 });
  const isLoading = useSelector(getIsLoadingDialogs);
  const { userId } = useParams<{ userId?: string }>();

  useEffect(() => {
    dispatch(getDialogsAsync());

    return () => {
      dispatch(setCurrentDialog());
      dispatch(setDialogsPage(1));
    };
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(setCurrentDialog());
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return <Loader />;
  }

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