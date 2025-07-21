import { FC, memo, MouseEvent, useCallback, useMemo } from "react";
import { ChatMessageProps } from "./type";
import { Message } from "@ui/message";
import { TContextMenuItem } from "@providers/context-menu";
import { ReportIcon, TrashIcon } from "@icons";
import s from "./chat-message.module.css";

export const ChatMessage: FC<ChatMessageProps> = memo(
  ({
    messageId,
    onReport,
    onDelete,
    setContextMenu,
    setIsOpenMenu,
    ...baseProps
  }) => {
    const menuItems: TContextMenuItem[] = useMemo(
      () => [
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
        {
          content: (
            <>
              <ReportIcon className={s.icon} />
              <span>Пожаловаться</span>
            </>
          ),
          onClick: () => {
            onReport(messageId);
            setIsOpenMenu(false);
          },
        },
      ],
      [messageId, setIsOpenMenu, onDelete, onReport]
    );

    const openContextMenu = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { clientX, clientY } = e;
        setContextMenu(menuItems, [clientX, clientY]);
      },
      [setContextMenu, menuItems]
    );

    return <Message {...baseProps} openContextMenu={openContextMenu} />;
  }
);
