import clsx from "clsx";
import { FC } from "react";
import s from "./chat-wrapper.module.css";
import { ChatWrapperProps } from "./type";

export const ChatWrapper: FC<ChatWrapperProps> = ({
  header,
  body,
  footer,
  className,
}) => (
  <div className={clsx(s.wrapper, className)}>
    {header}
    {body && <div className={s.body}>{body}</div>}
    {footer && <footer>{footer}</footer>}
  </div>
);
