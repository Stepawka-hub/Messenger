import { MessageProps } from "@ui/message/type";

export type ChatMessageProps = Omit<MessageProps, "openContextMenu"> & {
  messageId: string;
  onReport: (m: string) => void;
  onDelete: (m: string) => void;
};
