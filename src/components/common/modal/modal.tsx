import { useDispatch } from "react-redux";
import { FC, useEffect } from "react";
import { ModalProps } from "./types";
import { setIsOpenModal } from "@slices/app";
import clsx from "clsx";
import s from "./Modal.module.css";

export const Modal: FC<ModalProps> = ({ children, isOpen, delay }) => {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(setIsOpenModal(false));

  useEffect(() => {
    const timerId = setTimeout(closeModal, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(s.overlay, {
        [s.hidden]: !isOpen,
      })}
    >
      <div className={s.modal}>
        {children}
        <span className={s.modalClose} onClick={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
