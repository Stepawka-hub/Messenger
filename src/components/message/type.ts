import { TUserId } from '@types';

export type MessageProps = {
  senderId: TUserId;
  photo?: string | null;
  username: string;
  content: string;
};
