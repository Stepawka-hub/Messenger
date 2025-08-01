import { FC, memo, MouseEventHandler, useCallback, useEffect } from "react";
import { TModalProps } from "./types";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { FIXED_BLOCK_CLASS } from "@hooks";
import s from "./modal.module.css";
import clsx from "clsx";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = memo(
  ({ isOpen, nodeRef, children, enableScroll, onClose }) => {
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
        onExited={enableScroll}
      >
        <div ref={nodeRef} className={s.modal}>
          <div
            className={clsx(FIXED_BLOCK_CLASS, s.overlay)}
            onClick={handleOverlayClick}
          >
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
