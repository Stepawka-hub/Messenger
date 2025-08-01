import { PropsWithChildren, RefObject } from 'react';

export type TModalProps = PropsWithChildren & {
  isOpen: boolean;
  nodeRef: RefObject<HTMLDivElement | null>;
  enableScroll: () => void;
  onClose: () => void;
};
