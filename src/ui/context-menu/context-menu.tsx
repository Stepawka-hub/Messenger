import { FC, MouseEvent } from "react";
import { CSSTransition } from "react-transition-group";
import { useClickOutside } from "@hooks";
import { ContextMenuProps } from "./type";
import s from "./context-menu.module.css";

export const ContextMenu: FC<ContextMenuProps> = ({
  ref,
  isOpen,
  items,
  position,
  setIsOpen,
}) => {
  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside({
    elementRef: ref,
    isOpen,
    onClose: closeMenu,
  });

  const onContextMenu = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    closeMenu();
  };

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={ref}
      timeout={300}
      classNames={{
        enter: s.menuEnter,
        enterActive: s.menuEnterActive,
        exit: s.menuExit,
        exitActive: s.menuExitActive,
      }}
      unmountOnExit
    >
      <ul
        ref={ref}
        className={s.contextMenu}
        style={{ left: position[0], top: position[1] }}
        onContextMenu={onContextMenu}
      >
        {items.map(({ content, onClick }, idx) => (
          <li
            key={idx}
            className={s.menuItem}
            onClick={onClick}
            onContextMenu={onClick}
          >
            {content}
          </li>
        ))}
      </ul>
    </CSSTransition>
  );
};
