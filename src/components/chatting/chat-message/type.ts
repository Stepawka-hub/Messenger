import { TContextMenuItem } from "@providers/context-menu";
import { MessageProps } from "@ui/message/type";

export type ChatMessageProps = Omit<MessageProps, "openContextMenu"> & {
  messageId: string;
  onReport: (m: string) => void;
  onDelete: (m: string) => void;
  setIsOpenMenu: (v: boolean) => void;
  setContextMenu: (
    items: TContextMenuItem[],
    position: [number, number]
  ) => void;
};
