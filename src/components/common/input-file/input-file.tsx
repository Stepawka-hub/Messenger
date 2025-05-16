import { FC } from "react";
import s from "./input-file.module.css";
import { InputFileProps } from "./types";

export const InputFile: FC<InputFileProps> = ({ text, ...props }) => (
  <label className={s.inputFile}>
    <input type="file" className={s.input} {...props} />
    <span className={s.text}>{text}</span>
  </label>
);
