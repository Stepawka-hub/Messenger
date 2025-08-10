import { RefObject, useEffect } from "react";
import { useThrottle } from "./useThrottle";

export type TUseCursorDistanceArgs = {
  ref: RefObject<HTMLElement | null>;
  condition?: boolean;
  callback: () => void;
  distance?: number;
};

export const useCursorDistance = ({
  ref,
  condition = true,
  callback,
  distance = 64,
}: TUseCursorDistanceArgs) => {
  const checkDistance = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const isCursorFar =
      e.clientX < rect.left - distance ||
      e.clientX > rect.right + distance ||
      e.clientY < rect.top - distance ||
      e.clientY > rect.bottom + distance;

    if (isCursorFar) {
      callback();
    }
  };

  const handleMouseMove = useThrottle({ fn: checkDistance, limit: 100 });

  useEffect(() => {
    if (condition) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [condition, handleMouseMove]);
};
