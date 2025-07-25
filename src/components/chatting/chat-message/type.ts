import { DeletedMessageBannerProps } from "@ui/deleted-message-banner/type";
import { MessageProps } from "@ui/message/type";

export type ChatMessageProps = Omit<MessageProps, "openContextMenu"> &
  DeletedMessageBannerProps & {
    messageId: string;
    isDeleted?: boolean;
    isDeleting: boolean;
    isRestoring: boolean;
    onDelete: (m: string) => void;
  };
