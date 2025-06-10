import clsx from "clsx";
import { FC } from "react";
import s from "./textarea.module.css";
import { TextareaProps } from "./type";
import TextareaAutosize from "react-textarea-autosize";

export const Textarea: FC<TextareaProps> = ({
  id,
  classes = {},
  label,
  error,
  className,
  ...props
}) => {
  const {
    wrapper = s.textareaWrapper,
    label: labelClass = s.label,
    textarea: textareaClass = s.textarea,
    error: errorClass = s.error,
  } = classes;

  return (
    <div className={wrapper}>
      {label && (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      <TextareaAutosize
        id={id}
        className={clsx(textareaClass, className)}
        {...props}
      />
      {error && <span className={errorClass}>{error}</span>}
    </div>
  );
};
