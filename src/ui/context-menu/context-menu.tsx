import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { useClickOutside, useCursorDistance } from "@hooks";
import { ContextMenuProps } from "./type";
import s from "./context-menu.module.css";
import clsx from "clsx";

export const ContextMenu: FC<ContextMenuProps> = ({
  isOpen,
  items,
  position,
  setIsOpen,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuPosition, setMenuPosition] = useState<[number, number]>(position);

  const correctPosition = useCallback(
    (position: [number, number]): [number, number] => {
      if (!menuRef.current) return position;

      const [x, y] = position;
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;

      let adjustedX = x;
      if (x + menuWidth > window.innerWidth) {
        adjustedX = x - menuWidth;
      }

      let adjustedY = y;
      if (y + menuHeight > window.innerHeight) {
        adjustedY = y - menuHeight;
      }

      return [adjustedX, adjustedY];
    },
    []
  );

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside({
    elementRef: menuRef,
    isOpen,
    onClose: closeMenu,
  });

  useCursorDistance({ ref: menuRef, callback: closeMenu, condition: isOpen });

  useEffect(() => {
    const newPosition = correctPosition(position);
    setMenuPosition(newPosition);
  }, [position, correctPosition]);

  const onContextMenu = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    closeMenu();
  };

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={menuRef}
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
        ref={menuRef}
        className={clsx("fix-block", s.contextMenu)}
        style={{ left: menuPosition[0], top: menuPosition[1] }}
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
