export type TContextMenuItem = {
  name: string;
  onClick: () => void;
};

export type TContextMenuModel = {
  setContextMenu: (
    items: TContextMenuItem[],
    position: [number, number]
  ) => void;
  setIsOpenMenu: (v: boolean) => void;
};
