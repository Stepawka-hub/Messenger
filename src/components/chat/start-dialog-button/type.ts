import { ButtonHTMLAttributes } from "react";

export type StartDialogButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  userId: number;
  onSuccess?: () => void;
};
