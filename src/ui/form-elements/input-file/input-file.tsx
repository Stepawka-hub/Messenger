import { FC } from "react";
import s from "./input-file.module.css";
import { InputFileProps } from "./types";
import clsx from "clsx";

export const InputFile: FC<InputFileProps> = ({
  children,
  className,
  ...props
}) => (
  <label className={clsx(s.inputFile, className)}>
    <input type="file" className={s.input} {...props} />
    {children}
  </label>
);
