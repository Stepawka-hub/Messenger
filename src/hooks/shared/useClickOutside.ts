import { RefObject, useEffect } from "react";

type TUseClickOutsideArgs<T extends HTMLElement | null> = {
  isOpen: boolean;
  elementRef: RefObject<T>;
  onClose: () => void;
};

export const useClickOutside = <T extends HTMLElement | null>({
  isOpen,
  elementRef,
  onClose,
}: TUseClickOutsideArgs<T>) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (elementRef.current && elementRef.current.contains(evt.target as Node))
        return;

      if (isOpen) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [elementRef, isOpen, onClose]);
};
