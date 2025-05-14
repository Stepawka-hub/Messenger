import { ModalProps } from "../modal/types";

export type ModalErrorProps = ModalProps & {
  title: string;
  errorText: string;
};
