import { addMessages, getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import { Message } from "@ui/message";
import { FC, useEffect } from "react";
import s from "./message-list.module.css";
import { TChatMessage } from "@types";

const ws = new WebSocket(import.meta.env.VITE_WS_API_URL);

export const MessageList: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);

  useEffect(() => {
    ws.addEventListener("message", (e: MessageEvent<string>) => {
      const parsedData: TChatMessage[] = JSON.parse(e.data);
      dispatch(addMessages(parsedData));
    });
  }, [dispatch]);

  return (
    <section className={s.list}>
      {messages.map(({ id, photo, userName, message }) => (
        <Message key={id} photo={photo} username={userName} content={message} />
      ))}
    </section>
  );
};
