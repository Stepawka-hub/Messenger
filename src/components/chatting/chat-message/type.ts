import { MessageProps } from "@ui/message/type";

export type ChatMessageProps = Omit<MessageProps, "openContextMenu"> & {
  messageId: string;
  isDeleted?: boolean;
  isDeleting: boolean;
  isRestoring: boolean;
  onRestore: (m: string) => void;
  onDelete: (m: string) => void;
};
