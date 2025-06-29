import { FC } from "react";
import { BurgerMenuProps } from './type';
import s from './burger-menu.module.css';

export const BurgerMenu: FC<BurgerMenuProps> = ({ isActive, setIsActive }) => (
  <button onClick={setIsActive}>
    {isActive ? "Active burger" : "Disable burger"}
  </button>
);
