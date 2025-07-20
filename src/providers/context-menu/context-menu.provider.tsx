import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { TContextMenuItem } from "./types";
import { ContextMenu } from "./context-menu.context";
import { ContextMenu as ContextMenuUI } from "@ui/context-menu";

export const ContextMenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<TContextMenuItem[]>([]);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  const setContextMenu = useCallback(
    (items: TContextMenuItem[], position: [number, number]) => {
      setIsOpen(true);
      setMenuItems(items);
      setPosition(position);
    },
    []
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
      {isOpen && (
        <ContextMenuUI
          isOpen={isOpen}
          items={menuItems}
          position={position}
          setIsOpen={setIsOpen}
        />
      )}
      {children}
    </ContextMenu.Provider>
  );
};
