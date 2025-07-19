import { FC } from "react";
import { NavLink } from "react-router-dom";
import { LinkProps } from "./type";
import clsx from "clsx";
import s from "./link.module.css";

export const Link: FC<LinkProps> = ({ to, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(className || s.link, {
          [s.active]: isActive,
        })
      }
    >
      {label}
    </NavLink>
  );
};
