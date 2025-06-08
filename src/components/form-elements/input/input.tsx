import { FC } from "react";
import { InputProps } from "./type";
import s from "./input.module.css";
import clsx from "clsx";

export const Input: FC<InputProps> = ({
  id,
  classes = {},
  label,
  error,
  className,
  ...props
}) => {
  const {
    wrapper = s.inputWrapper,
    label: labelClass = s.label,
    input: inputClass = s.input,
    error: errorClass = s.error,
  } = classes;
  return (
    <div className={wrapper}>
      {label && (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={clsx(inputClass, className)} {...props} />
      {error && <span className={errorClass}>{error}</span>}
    </div>
  );
};
