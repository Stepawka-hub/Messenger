import { NavLink } from "react-router-dom";
import { FriendList } from "@components/friend-list";
import { FC } from "react";
import s from "./navbar.module.css";

export const Navbar: FC = () => (
  <nav className={s.nav}>
    <div className={s.links}>
      <NavLink to="/profile" className={s.link}>
        Profile
      </NavLink>
      <NavLink to="/dialogs" className={s.link}>
        Messages
      </NavLink>
      <NavLink to="/users" className={s.link}>
        Find friends
      </NavLink>
      <NavLink to="/news" className={s.link}>
        News
      </NavLink>
      <NavLink to="/music" className={s.link}>
        Music
      </NavLink>
      <NavLink to="/settings" className={s.link}>
        Settings
      </NavLink>
    </div>

    <div className={s.friends}>
      <FriendList />
    </div>
  </nav>
);
