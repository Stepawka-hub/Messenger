import { TUserId } from '@types';

export type MessageProps = {
  senderId: TUserId;
  photo?: string | null;
  username: string;
  content: string;
  addedAt?: string;
  isViewed?: boolean;
  isOwnMessage?: boolean;
  isMobile?: boolean;
};
