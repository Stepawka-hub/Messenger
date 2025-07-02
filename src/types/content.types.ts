import { TPhotos } from "./shared.types";
import { TUserId } from "./user.types";

export type TChatMessage = {
  id: number;
  userId: TUserId;
  userName: string;
  message: string;
  photo: string;
};

export type TDialog = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: TPhotos;
};
