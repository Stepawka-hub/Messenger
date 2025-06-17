import { FC } from "react";
import s from "./input-file.module.css";
import { InputFileProps } from "./types";
import clsx from "clsx";

export const InputFile: FC<InputFileProps> = ({
  text,
  className,
  ...props
}) => (
  <label className={clsx(s.inputFile, className)}>
    <input type="file" className={s.input} {...props} />
    <span className={s.text}>{text}</span>
  </label>
);
