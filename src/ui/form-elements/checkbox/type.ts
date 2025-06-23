import { InputHTMLAttributes } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  classes?: Partial<{
    checkbox: string;
    label: string;
    checkboxInput: string;
    error: string;
  }>;
  label?: string;
  error?: string;
};
