import { FC } from "react";
import { BurgerMenuProps } from "./type";
import s from "./burger-menu.module.css";
import clsx from "clsx";

export const BurgerMenu: FC<BurgerMenuProps> = ({ isActive, setIsActive }) => (
  <div
    className={clsx(s.burger, { [s.active]: isActive })}
    onClick={setIsActive}
  >
    <span className={clsx(s.lines)}></span>
  </div>
);
