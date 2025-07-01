import { DialogList, MessageList, SendMessageForm } from "@components/chat";
import { Helmet } from "@components/helmet";
import { FC, useEffect } from "react";
import s from "./dialogs.module.css";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const Chat: FC = () => {
  useEffect(() => {
    ws.addEventListener("message", (e) => {
      console.log(JSON.parse(e.data));
    });
  }, []);

  return (
    <>
      <Helmet
        title="Диалоги"
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
