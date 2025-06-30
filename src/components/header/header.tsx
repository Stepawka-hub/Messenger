import { FC } from "react";
import s from "./header.module.css";
import { HeaderProps } from "./type";

export const Header: FC<HeaderProps> = ({ leftPart, rightPart }) => {
  return (
    <header className={s.header}>
      <div className={s.leftPart}>{leftPart}</div>
      <div className={s.rightPart}>{rightPart}</div>
    </header>
  );
};
