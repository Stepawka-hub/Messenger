import { FC } from "react";
import { CheckboxProps } from "./type";
import clsx from "clsx";
import s from "./checkbox.module.css";

export const Checkbox: FC<CheckboxProps> = ({
  id,
  classes = {},
  label,
  error,
  className,
  ...props
}) => {
  const {
    checkbox = s.checkbox,
    label: labelClass = s.label,
    checkboxInput = s.checkboxInput,
    error: errorClass = s.error,
  } = classes;

  return (
    <div className={clsx(checkbox, className)}>
      {label && (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="checkbox"
        className={checkboxInput}
        {...props}
      />
      {error && <span className={errorClass}>{error}</span>}
    </div>
  );
};
