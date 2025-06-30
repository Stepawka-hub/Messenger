import { FC, memo, MouseEventHandler, useCallback, useEffect } from "react";
import { TModalProps } from "./types";
import { createPortal } from "react-dom";
import s from "./modal.module.css";
import { CSSTransition } from "react-transition-group";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = memo(
  ({ isOpen, nodeRef, children, onClose }) => {
    const closeByEsc = useCallback(
      (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
          onClose();
        }
      },
      [onClose]
    );

    const handleOverlayClick: MouseEventHandler = useCallback(
      (evt) => {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }, [isOpen, closeByEsc]);

    return createPortal(
      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={500}
        classNames={{
          enter: s.modalEnter,
          enterActive: s.modalEnterActive,
          exit: s.modalExit,
          exitActive: s.modalExitActive,
        }}
        unmountOnExit
      >
        <div ref={nodeRef} className={s.modal}>
          <div className={s.overlay} onClick={handleOverlayClick}>
            <div className={s.content}>
              {children}
              <button className={s.btnClose} onClick={onClose} />
            </div>
          </div>
        </div>
      </CSSTransition>,
      modalRoot!
    );
  }
);
