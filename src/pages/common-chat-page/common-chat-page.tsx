import { CommonChat } from "@components/chatting";
import { socketConnect, socketDisconnect } from "@services/socket";
import { useDispatch } from "@store";
import { PageWrapper } from "@ui/page-wrapper";
import { FC, useEffect } from "react";
import s from "./common-chat-page.module.css";

export const CommonChatPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketConnect());

    return () => {
      dispatch(socketDisconnect());
    };
  }, [dispatch]);

  return (
    <PageWrapper
      pageTitle="Общий чат"
      title="Общий чат"
      description="Общий чат для общения"
      className={s.page}
    >
      <CommonChat />
    </PageWrapper>
  );
};
