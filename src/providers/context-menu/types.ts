import { ReactNode } from "react";

export type TContextMenuItem = {
  content: ReactNode;
  onClick: () => void;
};

export type TContextMenuModel = {
  setContextMenu: (
    items: TContextMenuItem[],
    position: [number, number]
  ) => void;
  setIsOpenMenu: (v: boolean) => void;
};
