import { FC, MouseEvent } from "react";
import { BurgerMenuProps } from "./type";
import s from "./burger-menu.module.css";
import clsx from "clsx";

export const BurgerMenu: FC<BurgerMenuProps> = ({ isActive, setIsActive }) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive();
  };

  return (
    <div
      className={clsx(s.burger, { [s.active]: isActive })}
      onClick={handleClick}
    >
      <span className={clsx(s.lines)}></span>
    </div>
  );
};
