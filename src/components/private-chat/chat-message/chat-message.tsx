import { FC, memo, MouseEvent } from "react";
import { TContextMenuItem } from "@providers/context-menu";
import { ChatMessageProps } from "./type";
import { useContextMenu } from "@hooks";
import { TrashIcon } from "@icons";
import { Message } from "@ui/message";
import { Loader } from "@ui/loader";
import { DeletedMessageBanner } from "@ui/deleted-message-banner";
import s from "./chat-message.module.css";
import { MenuItem } from "@ui/menu-item";

export const ChatMessage: FC<ChatMessageProps> = memo(
  ({
    messageId,
    isDeleted = false,
    isDeleting,
    isRestoring,
    onDelete,
    onRestore,
    ...baseProps
  }) => {
    const { setContextMenu, setIsOpenMenu } = useContextMenu();

    if (isDeleting || isRestoring) {
      return <Loader />;
    }

    if (isDeleted) {
      return (
        <DeletedMessageBanner messageId={messageId} onRestore={onRestore} />
      );
    }

    const menuItems: TContextMenuItem[] = [
      {
        content: (
          <MenuItem
            icon={<TrashIcon className={s.icon} />}
            text="Удалить сообщение у себя"
          />
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
