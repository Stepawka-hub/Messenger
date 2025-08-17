import { BottomArrowIcon } from "@icons";
import { IconButton } from "@ui/icon-button";
import { FC, memo, useRef } from "react";
import { ScrollButtonProps } from "./types";
import s from "./scroll-button.module.css";
import { CSSTransition } from "react-transition-group";

export const ScrollButton: FC<ScrollButtonProps> = memo(
  ({ isShow = true, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
      <CSSTransition
        in={isShow}
        nodeRef={ref}
        timeout={250}
        classNames={{
          enter: s.enter,
          enterActive: s.enterActive,
          exit: s.exit,
          exitActive: s.exitActive,
        }}
        unmountOnExit
      >
        <div ref={ref}>
          <IconButton extraClass={s.scrollButton} onClick={onClick}>
            <BottomArrowIcon />
          </IconButton>
        </div>
      </CSSTransition>
    );
  }
);
