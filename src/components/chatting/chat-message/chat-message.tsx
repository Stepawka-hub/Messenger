import { useContextMenu } from "@hooks/useContextMenu";
import { TrashIcon } from "@icons";
import { TContextMenuItem } from "@providers/context-menu";
import { Message } from "@ui/message";
import { FC, memo, MouseEvent } from "react";
import { ChatMessageProps } from "./type";
import s from "./chat-message.module.css";

export const ChatMessage: FC<ChatMessageProps> = memo(
  ({ messageId, isRemoved = false, onDelete, onRestore, ...baseProps }) => {
    const { setContextMenu, setIsOpenMenu } = useContextMenu();

    if (isRemoved) {
      return (
        <div onClick={() => onRestore(messageId)}>
          Удалённое сообщение. Восстановить?
        </div>
      );
    }

    const menuItems: TContextMenuItem[] = [
      {
        content: (
          <>
            <TrashIcon className={s.icon} />
            <span>Удалить сообщение у себя</span>
          </>
        ),
        onClick: () => {
          onDelete(messageId);
          setIsOpenMenu(false);
        },
      },
    ];

    const openContextMenu = (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX, clientY } = e;
      setContextMenu(menuItems, [clientX, clientY]);
    };

    return <Message {...baseProps} openContextMenu={openContextMenu} />;
  }
);
