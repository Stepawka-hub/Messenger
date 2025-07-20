import { ReactNode } from 'react'

export type TModalState = {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
};

export type ModalProviderProps = {
  children: ReactNode;
}