import { FC, useEffect } from "react";
import { useClickOutside } from "@hooks/useClickOutside";
import { getCurrentUser, getIsAuth } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { Link } from "@ui/link";
import { SidebarProps } from "./type";
import { Counter } from "@ui/counter";
import { getNewMessageCount } from "@slices/dialogs";
import { getNewMessageCountAsync } from "@thunks/dialogs";
import clsx from "clsx";
import s from "./sidebar.module.css";

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const newMessageCount = useSelector(getNewMessageCount);

  useEffect(() => {
    dispatch(getNewMessageCountAsync());
  }, [dispatch]);

  const userId = currentUser?.id || "";
  const ref = useClickOutside({ isActive: isOpen, callback: onClose });

  return (
    <aside className={clsx(s.sidebar, { [s.active]: isOpen })} ref={ref}>
      <nav className={s.nav}>
        {isAuth && (
          <>
            <Link to={`/profile/${userId}`} label="Profile" />
            <Link to={`/dialogs`} label="Dialogs">
              <Counter count={newMessageCount} />
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
