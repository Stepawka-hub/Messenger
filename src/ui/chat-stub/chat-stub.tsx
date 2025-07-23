import { FC, PropsWithChildren } from "react";
import s from "./chat-stub.module.css";

export const ChatStub: FC<PropsWithChildren> = ({
  children = "Выберите чат",
}) => <div className={s.stub}>{children}</div>;
