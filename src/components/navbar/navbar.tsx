import { NavLink } from "react-router-dom";
import { FriendList } from "@components/friend-list";
import { FC } from "react";
import s from "./navbar.module.css";
import clsx from "clsx";

export const Navbar: FC = () => (
  <nav className={s.nav}>
    <div className={s.links}>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/dialogs"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        Messages
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        Find friends
      </NavLink>
      <NavLink
        to="/news"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        News
      </NavLink>
      <NavLink
        to="/music"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        Music
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          clsx(s.link, { [s.link_active]: isActive })
        }
      >
        Settings
      </NavLink>
    </div>

    <div className={s.friends}>
      <FriendList />
    </div>
  </nav>
);
