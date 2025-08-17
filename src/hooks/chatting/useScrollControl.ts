import { TScrollToIndex } from "@components/chat";
import { Virtualizer } from "@tanstack/react-virtual";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type TUseScrollControlArgs = {
  dataLength: number;
  resetDep?: unknown;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  parentRef: RefObject<HTMLDivElement | null>;
};

const SCROLL_THRESHOLD = 60;

export const useScrollControl = ({
  dataLength,
  resetDep,
  virtualizer,
  parentRef,
}: TUseScrollControlArgs) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const isInitializing = useRef(true);

  const scrollToBottom = useCallback(() => {
    virtualizer.scrollToIndex(dataLength - 1, { align: "end" });
    setShowScrollButton(false);
  }, [virtualizer, dataLength]);

  const scrollToIndex = useCallback<TScrollToIndex>(
    (value, options = { align: "start" }) => {
      virtualizer.scrollToIndex(value, options);
    },
    [virtualizer]
  );

  const isAtBottom = useCallback(() => {
    const totalSize = virtualizer.getTotalSize();
    if (!parentRef.current || !totalSize) return true;

    const scrollOffset = virtualizer.scrollOffset || 0;
    const parentHeight = parentRef.current.clientHeight;
    return scrollOffset >= totalSize - parentHeight - SCROLL_THRESHOLD;
  }, [virtualizer, parentRef]);

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      if (!isInitializing.current) {
        setShowScrollButton(!isAtBottom());
      }
    };

    if (isInitializing.current && dataLength) {
      scrollToBottom();
      isInitializing.current = false;
      setShowScrollButton(false);
    }

    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [parentRef, dataLength, scrollToBottom, isAtBottom]);

  useEffect(() => {
    isInitializing.current = true;
  }, [resetDep]);

  return {
    showScrollButton,
    scrollToBottom,
    scrollToIndex,
  };
};
