import { FC } from "react";
import s from "./radio.module.css";
import { RadioProps } from "./type";

export const Radio: FC<RadioProps> = ({ id, label, ...props }) => {
  return (
    <div className={s.radio}>
      <input className={s.input} id={id} type="radio" {...props} />
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
    </div>
  );
};
