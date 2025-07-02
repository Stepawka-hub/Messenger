import { useClickOutside } from "@hooks/useClickOutside";
import { getCurrentUser, getIsAuth } from "@slices/auth";
import { useSelector } from "@store";
import clsx from "clsx";
import { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import s from "./sidebar.module.css";
import { SidebarProps, TNavItems } from "./type";

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const userId = currentUser?.id || "";
  const ref = useClickOutside({ isActive: isOpen, callback: onClose });

  const navItems: TNavItems[] = useMemo(
    () => [
      { to: `/profile/${userId}`, label: "Profile", hide: !isAuth },
      { to: "/dialogs", label: "Messenger", hide: !isAuth },
      { to: "/users", label: "Find friends", hide: !isAuth },
      { to: "/settings", label: "Settings" },
    ],
    [isAuth, userId]
  );

  return (
    <aside className={clsx(s.sidebar, { [s.active]: isOpen })} ref={ref}>
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
    </aside>
  );
};
