import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  delay: number;
};
