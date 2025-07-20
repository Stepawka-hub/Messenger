import { FC, PropsWithChildren, useCallback, useState } from "react";
import { ContextMenu } from "./context-menu.context";
import { TContextMenuItem } from './types';

export const ContextMenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<TContextMenuItem[]>([]);
  const [position, setPosition] = useState<number[]>([])

  const setContextMenu = useCallback((items: TContextMenuItem[], position: number[]) => {
    setMenuItems(items);
    setPosition(position);
  }, [])

  const value = {
    setContextMenu
  }

  return <ContextMenu.Provider value={value}>{children}</ContextMenu.Provider>;
};
