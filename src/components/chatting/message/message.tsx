import { useContextMenu } from "@hooks/useContextMenu";
import { TContextMenuItem } from "@providers/context-menu";
import { Avatar } from "@ui/avatar";
import { FC, memo, MouseEvent, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { MessageInfo } from "./message-info";
import { MessageProps } from "./type";
import clsx from "clsx";
import s from "./message.module.css";
import { ReportIcon, TrashIcon } from "@icons";

export const Message: FC<MessageProps> = memo(
  ({
    senderId,
    photo = null,
    username,
    content,
    addedAt,
    isViewed = false,
    isOwnMessage = false,
    isMobile = false,
    hideInfo = false,
  }) => {
    const { setContextMenu, setIsOpenMenu } = useContextMenu();

    const menuItems: TContextMenuItem[] = useMemo(
      () => [
        {
          content: (
            <>
              <TrashIcon className={s.icon} />
              <span className={s.menuIconText}>Удалить сообщение у себя</span>
            </>
          ),
          onClick: () => {
            setIsOpenMenu(false);
          },
        },
        {
          content: (
            <>
              <ReportIcon className={s.icon} />
              <span className={s.menuIconText}>Пожаловаться</span>
            </>
          ),
          onClick: () => {
            setIsOpenMenu(false);
          },
        },
      ],
      [setIsOpenMenu]
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

    return (
      <article
        className={clsx(s.message, { [s.own]: isOwnMessage && isMobile })}
        onClick={isMobile ? openContextMenu : undefined}
        onContextMenu={openContextMenu}
      >
        <div className={s.userInfo}>
          {!isMobile && (
            <NavLink to={`/profile/${senderId}`}>
              <Avatar image={photo} size="small" />
            </NavLink>
          )}
          <div className={s.content}>
            {!isMobile && <h4 className={s.sender}>{username}</h4>}
            <span className={s.text}>{content}</span>
          </div>
        </div>
        {!hideInfo && (
          <MessageInfo
            addedAt={addedAt}
            isViewed={isViewed}
            isOwnMessage={isOwnMessage}
          />
        )}
      </article>
    );
  }
);
