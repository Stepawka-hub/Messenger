import { NavLink } from "react-router-dom";
import { FriendList } from "@components/friend-list";
import { FC, useMemo } from "react";
import s from "./navbar.module.css";
import clsx from "clsx";
import { useSelector } from "@store";
import { getCurrentUser, getIsAuth } from "@slices/auth";

export const Navbar: FC = () => {
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);
  const userId = currentUser?.id || "";

  const navItems = useMemo(
    () => [
      { to: `/profile/${userId}`, label: "Profile" },
      { to: "/dialogs", label: "Messages" },
      { to: "/users", label: "Find friends" },
      { to: "/news", label: "News" },
      { to: "/music", label: "Music" },
      { to: "/settings", label: "Settings" },
    ],
    [userId]
  );

  return (
    <nav className={s.nav}>
      <div className={s.links}>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(s.link, { [s.link_active]: isActive })
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      {isAuth && <FriendList />}
    </nav>
  );
};
