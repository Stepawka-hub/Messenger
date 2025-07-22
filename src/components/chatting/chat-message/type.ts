import { MessageProps } from "@ui/message/type";

export type ChatMessageProps = Omit<MessageProps, "openContextMenu"> & {
  messageId: string;
  isRemoved?: boolean;
  onRestore: (m: string) => void;
  onDelete: (m: string) => void;
};
