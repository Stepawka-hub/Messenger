import { TPhotos } from "./shared.types";
import { TUserId } from "./user.types";

export type TDialog = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: TPhotos;
};

export type TMessage = {
  id: string;
  body: string;
  addedAt: string;
  senderId: TUserId;
  senderName: string;
  recipientId: TUserId;
  viewed: boolean;

  recipientName?: string;
  deletedBySender?: boolean;
  deletedByRecipient?: boolean;
  isSpam?: boolean;
};

export type TChatMessage = {
  userId: TUserId;
  userName: string;
  message: string;
  photo: string;
};
