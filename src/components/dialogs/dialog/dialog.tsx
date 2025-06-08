import { NavLink } from "react-router-dom";
import { DialogProps } from "./type";
import { FC } from "react";
import s from "./dialog.module.css";
import clsx from "clsx";

export const Dialog: FC<DialogProps> = ({ dialog }) => {
  const { id, username } = dialog;
  const path = "/dialogs/" + id;

  return (
    <article>
      <NavLink
        to={path}
        className={({isActive}) => clsx(s.dialog, { [s.active]: isActive })}
      >
        {username}
      </NavLink>
    </article>
  );
};
