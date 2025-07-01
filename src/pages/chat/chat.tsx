import { DialogList, MessageList, SendMessageForm } from "@components/chat";
import { Helmet } from "@components/helmet";
import { FC } from "react";
import s from "./chat.module.css";

const Chat: FC = () => {
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
