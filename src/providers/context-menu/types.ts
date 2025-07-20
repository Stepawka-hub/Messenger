export type TContextMenuItem = {
  name: string;
  onClick: () => void;
}

export type TContextMenuModel = {
  setContextMenu: (items: TContextMenuItem[], position: number[]) => void;
}