import { FC } from "react";
import s from "./FormsControls.module.css";
import { FormControlProps, FormErrorProps } from "./types";

export const FormControl: FC<FormControlProps> =
  (FormElement: FC) =>
  ({ input, meta, classElement, classField, initialValue, ...props }) => {
    const hasError = meta.touched && meta.error;
    const invalidClass = hasError ? s.element_invalid : "";

    return (
      <div className={`${s.container} ${classField || ""}`}>
        <FormElement
          {...input}
          {...props}
          className={`${classElement || ""} ${invalidClass}`}
        />
        {hasError && <span className={s.error}>{meta.error}</span>}
      </div>
    );
  };

export const FormError: FC<FormErrorProps> = ({ error }) => (
  <span className={s.formErrorText}>{error}</span>
);
