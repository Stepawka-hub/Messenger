import { ReactNode } from 'react'

export type TModalContext = {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
};

export type ModalProviderProps = {
  children: ReactNode;
}