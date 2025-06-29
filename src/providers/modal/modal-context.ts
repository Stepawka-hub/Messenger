import { createContext } from "react";
import { TModalContext } from './types';

const initialState = {
  showModal: () => null,
  hideModal: () => null,
};

export const ModalContext = createContext<TModalContext>(initialState);
