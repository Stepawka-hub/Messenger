import { FC } from "react";
import { DeletedMessageBannerProps } from "./type";
import { Button } from "@ui/button";
import s from "./deleted-message-banner.module.css";

export const DeletedMessageBanner: FC<DeletedMessageBannerProps> = ({
  messageId,
  onRestore,
}) => {
  const handleRestore = () => {
    onRestore(messageId);
  };

  return (
    <div className={s.container}>
      <span className={s.text}>Сообщение удалено.</span>
      <Button className={s.button} onClick={handleRestore}>
        Восстановить
      </Button>
    </div>
  );
};
