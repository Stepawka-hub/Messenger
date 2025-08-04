import { FC, useRef } from "react";
import { useSelector } from "@store";
import { getCurrentUser, getIsAuth } from "@slices/auth";
import { getNewMessageCount } from "@slices/dialogs";
import { useClickOutside } from "@hooks";
import { SidebarProps } from "./type";
import { Counter } from "@ui/counter";
import { Link } from "@ui/link";
import clsx from "clsx";
import s from "./sidebar.module.css";

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const newMessageCount = useSelector(getNewMessageCount);

  const sidebarRef = useRef<HTMLElement>(null);
  useClickOutside({ elementRef: sidebarRef, isOpen, onClose });

  return (
    <aside className={clsx(s.sidebar, { [s.active]: isOpen })} ref={sidebarRef}>
      <nav className={s.nav}>
        {isAuth && (
          <>
            <Link to={`/profile/${currentUser?.id || ""}`} label="Профиль" />
            <Link to={`/dialogs`} label="Диалоги">
              {!!newMessageCount && <Counter count={newMessageCount} />}
            </Link>
            <Link to={`/chat`} label="Общий чат" />
            <Link to={`/users`} label="Найти друзей" />
          </>
        )}
        <Link to={`/settings`} label="Настройки" />
      </nav>
    </aside>
  );
};
