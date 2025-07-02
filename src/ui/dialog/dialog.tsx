import { NavLink } from "react-router-dom";
import { DialogProps } from "./type";
import { FC } from "react";
import s from "./dialog.module.css";
import clsx from "clsx";

export const Dialog: FC<DialogProps> = ({ id, userName }) => {
  const path = "/dialog/" + id;

  return (
    <article>
      <NavLink
        to={path}
        className={({ isActive }) => clsx(s.dialog, { [s.active]: isActive })}
      >
        {userName}
      </NavLink>
    </article>
  );
};
