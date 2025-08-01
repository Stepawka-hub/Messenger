import { useCallback } from "react";

export const FIXED_BLOCK_CLASS = "fixed-block";

export const useBodyScrollLock = () => {
  const fixBlocks = document.querySelectorAll<HTMLElement>(
    `.${FIXED_BLOCK_CLASS}`
  );

  const disableScroll = useCallback(() => {
    const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";

    document.body.style.paddingRight = paddingOffset;
    fixBlocks.forEach((e) => (e.style.paddingRight = paddingOffset));

    document.body.classList.add("disable-scroll");
  }, [fixBlocks]);

  const enableScroll = useCallback(() => {
    fixBlocks.forEach((e) => (e.style.paddingRight = "0px"));
    document.body.style.paddingRight = "0px";
    document.body.classList.remove("disable-scroll");
  }, [fixBlocks]);

  return { enableScroll, disableScroll };
};
