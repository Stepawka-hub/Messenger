import { createContext } from "react";
import { TModalState } from './types';

const initialState: TModalState = {
  showModal: () => null,
  hideModal: () => null,
};

export const ModalContext = createContext<TModalState>(initialState);
