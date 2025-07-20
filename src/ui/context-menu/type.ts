import { TContextMenuItem } from '@providers/context-menu'

export type ContextMenuProps = {
  isOpen: boolean;
  items: TContextMenuItem[];
  position: number[];
  setIsOpen: (v: boolean) => void;
}