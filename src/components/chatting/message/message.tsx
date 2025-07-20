import { Avatar } from "@ui/avatar";
import { FC, memo, MouseEvent, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { MessageInfo } from "./message-info";
import { MessageProps } from "./type";
import { useContextMenu } from "@hooks/useContextMenu";
import { TContextMenuItem } from "@providers/context-menu";
import s from "./message.module.css";
import clsx from "clsx";

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
          name: "Удалить сообщение (у себя)",
          onClick: () => {
            setIsOpenMenu(false);
          },
        },
        {
          name: "Добавить в спам",
          onClick: () => {
            setIsOpenMenu(false);
          },
        },
      ],
      [setIsOpenMenu]
    );

    const handleMenuContext = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        setContextMenu(menuItems, [clientX, clientY]);
      },
      [setContextMenu, menuItems]
    );

    console.log('RENDER');

    return (
      <article
        className={clsx(s.message, { [s.own]: isOwnMessage && isMobile })}
        onContextMenu={handleMenuContext}
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
