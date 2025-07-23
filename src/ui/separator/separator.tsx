import { FC } from "react";
import { SeparatorProps } from "./type";
import s from "./separator.module.css";

export const Separator: FC<SeparatorProps> = ({ text, showLines }) => (
  <div className={s.separator}>
    {showLines && <div className={s.line} />}
    <span className={s.text}>{text}</span>
    {showLines && <div className={s.line} />}
  </div>
);
