import { FC } from "react";
import { format } from "date-fns";
import { CheckIcon, DoubleCheckIcon } from "@icons";
import { convertTZ } from "@utils/helpers";
import { MessageInfoProps } from "./type";
import s from "./message-info.module.css";

export const MessageInfo: FC<MessageInfoProps> = ({
  addedAt,
  isViewed,
  isOwnMessage,
}) => {
  const messageTime = addedAt ? format(convertTZ(addedAt), "HH:mm") : null;

  let statusIcon = null;
  if (isOwnMessage) {
    statusIcon = isViewed ? (
      <DoubleCheckIcon className={s.icon} size={16} />
    ) : (
      <CheckIcon className={s.icon} size={16} />
    );
  }

  return (
    <div className={s.container}>
      {messageTime && <span className={s.messageTime}>{messageTime}</span>}
      {statusIcon}
    </div>
  );
};
