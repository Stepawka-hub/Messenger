import { TContextMenuItem } from '@providers/context-menu'
import { RefObject } from 'react';

export type ContextMenuProps = {
  ref: RefObject<HTMLUListElement | null>;
  isOpen: boolean;
  items: TContextMenuItem[];
  position: number[];
  setIsOpen: (v: boolean) => void;
}