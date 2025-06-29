import { NavLink } from "react-router-dom";
import { FriendList } from "@components/friend-list";
import { FC, useMemo } from "react";
import { useSelector } from "@store";
import { getCurrentUser, getIsAuth } from "@slices/auth";
import s from "./sidebar.module.css";
import clsx from "clsx";
import { SidebarProps } from './type';

export const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const userId = currentUser?.id || "";

  const navItems = useMemo(
    () => [
      { to: `/profile/${userId}`, label: "Profile", hide: !isAuth },
      { to: "/dialogs", label: "Messages", hide: !isAuth },
      { to: "/users", label: "Find friends", hide: !isAuth },
      { to: "/news", label: "News" },
      { to: "/music", label: "Music", hide: !isAuth },
      { to: "/settings", label: "Settings" },
    ],
    [isAuth, userId]
  );

  return (
    <aside className={s.sidebar}>
      <nav className={s.nav}>
        {navItems
          .filter((n) => !n.hide)
          .map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(s.link, {
                  [s.active]: isActive,
                })
              }
            >
              {label}
            </NavLink>
          ))}
      </nav>
      {isAuth && <FriendList />}
    </aside>
  );
};
