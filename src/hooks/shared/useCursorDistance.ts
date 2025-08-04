import { RefObject, useEffect } from "react";

export type TUseCursorDistanceArgs = {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
  distance?: number;
};

export const useCursorDistance = ({
  ref,
  callback,
  distance = 64,
}: TUseCursorDistanceArgs) => {
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      const isCursorFar =
        e.clientX < rect.left - distance ||
        e.clientX > rect.right + distance ||
        e.clientY < rect.top - distance ||
        e.clientY > rect.bottom + distance;

      if (isCursorFar) {
        callback();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [callback, ref, distance]);
};
