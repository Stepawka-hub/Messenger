import { FC } from "react";
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

  const userId = currentUser?.id || "";
  const ref = useClickOutside({ isActive: isOpen, callback: onClose });

  return (
    <aside className={clsx(s.sidebar, { [s.active]: isOpen })} ref={ref}>
      <nav className={s.nav}>
        {isAuth && (
          <>
            <Link to={`/profile/${userId}`} label="Profile" />
            <Link to={`/dialogs`} label="Dialogs">
              {!!newMessageCount && <Counter count={newMessageCount} />}
            </Link>
            <Link to={`/chat`} label="Common chat" />
            <Link to={`/users`} label="Find friends" />
          </>
        )}
        <Link to={`/settings`} label="Settings" />
      </nav>
    </aside>
  );
};
