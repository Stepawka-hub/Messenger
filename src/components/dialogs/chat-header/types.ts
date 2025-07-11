import { TUserId } from '@types'

export type ChatHeaderProps = {
  userId: TUserId;
  avatar?: string | null;
  username?: string;
}