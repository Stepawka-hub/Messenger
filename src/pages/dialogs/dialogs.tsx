import { FC } from "react";
import { useSelector } from "@store";
import { Dialog, Message } from "@components/dialogs";
import { getDialogs, getMessages } from "@slices/dialogs";
import useTitle from "@hooks/useTitle";
import s from "./dialogs.module.css";

const Dialogs: FC = () => {
  const dialogs = useSelector(getDialogs);
  const messages = useSelector(getMessages);
  useTitle("Messages");

  const dialogsElements = dialogs.map((d) => <Dialog key={d.id} dialog={d} />);
  const messagesElements = messages.map((m) => (
    <Message key={m.id} message={m} />
  ));

  return (
    <section className={s.page}>
      <section>{dialogsElements}</section>

      <div className={s.chatContainer}>
        <section>{messagesElements}</section>
      </div>
    </section>
  );
};

export default Dialogs;
