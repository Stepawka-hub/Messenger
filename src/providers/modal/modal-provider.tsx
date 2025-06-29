import { Modal } from "@components/modal";
import { memo, ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { ModalContext } from "./modal-context";
import { ModalProviderProps } from './types';

export const ModalProvider = memo(({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const showModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const contextValue = useMemo(
    () => ({ showModal, hideModal }),
    [showModal, hideModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        isOpen={isOpen}
        nodeRef={nodeRef}
        onClose={hideModal}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
});
