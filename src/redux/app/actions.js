import { INITIALIZED_SUCCESS, OPEN_MODAL, CLOSE_MODAL } from './actionTypes';

export const initializedSuccessAC = () => ({
  type: INITIALIZED_SUCCESS,
});

export const openModalAC = (title, text, delay) => ({
  type: OPEN_MODAL,
  settings: {
    title,
    text,
    delay
  }
});

export const closeModalAC = (isModalOpen) => ({
  type: CLOSE_MODAL,
  isModalOpen
});