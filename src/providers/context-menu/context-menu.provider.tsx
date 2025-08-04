import {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { TContextMenuItem } from "./types";
import { ContextMenu } from "./context-menu.context";
import { ContextMenu as ContextMenuUI } from "@ui/context-menu";

export const ContextMenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<TContextMenuItem[]>([]);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const correctPosition = useCallback(
    (position: [number, number]): [number, number] => {
      if (!menuRef.current) return position;

      const [x, y] = position;
      let adjustedX = x;
      let adjustedY = y;

      // Проверяем, изменилась ли позиция
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Корректировка по горизонтали
      if (x + menuWidth > windowWidth) {
        adjustedX = x - menuWidth;
      }

      // Корректировка по вертикали
      if (y + menuHeight > windowHeight) {
        adjustedY = y - menuHeight;
      }

      return [adjustedX, adjustedY];
    },
    []
  );

  const setContextMenu = useCallback(
    (items: TContextMenuItem[], position: [number, number]) => {
      setIsOpen(true);
      setMenuItems(items);
      setPosition(correctPosition(position));
    },
    [correctPosition]
  );

  const setIsOpenMenu = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  const value = useMemo(
    () => ({
      setContextMenu,
      setIsOpenMenu,
    }),
    [setContextMenu, setIsOpenMenu]
  );

  return (
    <ContextMenu.Provider value={value}>
      <ContextMenuUI
        ref={menuRef}
        isOpen={isOpen}
        items={menuItems}
        position={position}
        setIsOpen={setIsOpen}
      />
      {children}
    </ContextMenu.Provider>
  );
};
