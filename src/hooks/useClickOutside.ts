import { useEffect, useRef } from "react";

type TUseClickOutsideArgs = {
  isActive: boolean;
  callback: () => void;
};

export const useClickOutside = ({
  isActive,
  callback,
}: TUseClickOutsideArgs) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (elementRef.current && elementRef.current.contains(evt.target as Node))
        return;

      if (isActive) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive, callback]);

  return elementRef;
};
