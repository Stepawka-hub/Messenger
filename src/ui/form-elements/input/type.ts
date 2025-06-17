import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  classes?: Partial<{
    wrapper: string;
    label: string;
    input: string;
    error: string;
  }>;
  label?: string;
  error?: string;
};
