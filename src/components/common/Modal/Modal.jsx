/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import s from './Modal.module.css';
import { closeModalAC } from '../../../redux/app/actions';
import { useEffect } from 'react';

const Modal = ({ children, isOpen, delay }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeModalAC(false));
  };

  useEffect(() => {
    const timerId = setTimeout(closeModal, delay);
    return () => {
      clearTimeout(timerId);
    }
  }, [isOpen])

  return (
    <div className={`${s.modalContainer} ${!isOpen && s.hidden}`}>
      <div className={s.modal}>
        {children}
        <span
          className={s.modalClose}
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default Modal;
