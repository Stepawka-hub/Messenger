import { DialogList, MessageList, SendMessageForm } from "@components/chat";
import { Helmet } from "@components/helmet";
import { FC, useEffect } from "react";
import s from "./chat.module.css";
import { useDispatch } from "@store";
import { startMessagesListening, stopMessagesListening } from "@thunks/chat";

const Chat: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  return (
    <>
      <Helmet
        title="Сообщения"
        description="Общайтесь с друзьями и близкими в личном пространств"
      />
      <section className={s.page}>
        <div>
          <DialogList />
        </div>

        <div className={s.chat}>
          <MessageList />
          <SendMessageForm />
        </div>
      </section>
    </>
  );
};

export default Chat;
