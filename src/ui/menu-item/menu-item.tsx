import { FC } from "react";
import { MenuItemProps } from "./type";
import s from "./menu-item.module.css";

export const MenuItem: FC<MenuItemProps> = ({ icon, text }) => (
  <>
    {icon && <span className={s.iconWrapper}>{icon}</span>}
    <span className={s.text}>{text}</span>
  </>
);
