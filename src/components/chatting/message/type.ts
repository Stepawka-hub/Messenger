import { TUserId } from '@types';
import { MessageInfoProps } from './message-info/type';

export type MessageProps = MessageInfoProps & {
  senderId: TUserId;
  photo?: string | null;
  username: string;
  content: string;
  isOwnMessage?: boolean;
  isMobile?: boolean;
  hideInfo?: boolean,
};
