import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { LinkProps } from "./type";
import clsx from "clsx";
import s from "./link.module.css";

export const Link: FC<PropsWithChildren<LinkProps>> = ({
  to,
  label,
  children,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(className || s.link, {
          [s.active]: isActive,
        })
      }
    >
      <span className={s.linkText}>{label}</span>
      {children}
    </NavLink>
  );
};
