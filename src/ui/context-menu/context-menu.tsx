import { useClickOutside } from "@hooks/useClickOutside";
import { FC, MouseEvent } from "react";
import { ContextMenuProps } from "./type";
import s from "./context-menu.module.css";

export const ContextMenu: FC<ContextMenuProps> = ({
  isOpen,
  items,
  position,
  setIsOpen,
}) => {
  const closeMenu = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLUListElement>({
    isActive: isOpen,
    callback: closeMenu,
  });

  const onContextMenu = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    closeMenu();
  };

  return (
    <ul
      ref={ref}
      className={s.contextMenu}
      style={{ left: position[0], top: position[1] }}
      onContextMenu={onContextMenu}
    >
      {items.map(({ name, onClick }) => (
        <li className={s.menuItem} onClick={onClick} onContextMenu={onClick}>
          {name}
        </li>
      ))}
    </ul>
  );
};
