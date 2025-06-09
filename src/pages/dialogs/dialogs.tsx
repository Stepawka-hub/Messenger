import { Dialog, Message, SendMessageForm } from "@components/dialogs";
import { TSendMessageForm } from "@components/dialogs/send-message-form/types";
import { useTitle } from "@hooks/useTitle";
import { getDialogs, getMessages, sendMessage } from "@slices/dialogs";
import { useDispatch, useSelector } from "@store";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import s from "./dialogs.module.css";

const Dialogs: FC = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector(getDialogs);
  const messages = useSelector(getMessages);
  useTitle("Messages");

  const dialogsElements = dialogs.map((d) => <Dialog key={d.id} dialog={d} />);
  const messagesElements = messages.map((m) => (
    <Message key={m.id} message={m} />
  ));

  const onSubmit: SubmitHandler<TSendMessageForm> = (formData) => {
    dispatch(sendMessage(formData.message));
  };

  return (
    <section className={s.page}>
      <section>{dialogsElements}</section>

      <div className={s.chat}>
        <section className={s.messageList}>{messagesElements}</section>
        <SendMessageForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Dialogs;
