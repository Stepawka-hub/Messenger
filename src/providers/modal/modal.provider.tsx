import { Modal } from "@components/modal";
import {
  FC,
  memo,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ModalContext } from "./modal.context";
import { useBodyScrollLock } from "@hooks";

export const ModalProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { enableScroll, disableScroll } = useBodyScrollLock();

  const showModal = useCallback(
    (content: ReactNode) => {
      setModalContent(content);
      setIsOpen(true);
      disableScroll();
    },
    [disableScroll]
  );

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
        enableScroll={enableScroll}
        onClose={hideModal}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
});
