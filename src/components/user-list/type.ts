import { TSocialUser, TUserId } from '@types';

export type UserListProps = {
  users: TSocialUser[];
  onFollow: (id: TUserId) => void;
  onUnFollow: (id: TUserId) => void;
  followingInProgress: TUserId[]; 
}