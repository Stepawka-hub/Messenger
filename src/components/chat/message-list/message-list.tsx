import { addMessages, getMessages } from "@slices/chat";
import { useDispatch, useSelector } from "@store";
import { Message } from "@ui/message";
import { FC, useEffect } from "react";
import s from "./message-list.module.css";
import { TChatMessage } from "@types";
import { useWebSocket } from "@hooks/useWebSocket";

export const MessageList: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const { wsChannel } = useWebSocket();

  useEffect(() => {
    if (!wsChannel) return;
    const onMessage = (e: MessageEvent<string>) => {
      const parsedData: TChatMessage[] = JSON.parse(e.data);
      dispatch(addMessages(parsedData));
    };

    wsChannel.addEventListener("message", onMessage);

    return () => {
      wsChannel.removeEventListener("message", onMessage);
    }
  }, [dispatch, wsChannel]);

  return (
    <section className={s.list}>
      {messages.map(({ id, photo, userName, message }) => (
        <Message key={id} photo={photo} username={userName} content={message} />
      ))}
    </section>
  );
};
