import { TUser, TUserId } from 'src/types'

export type UserListProps = {
  users: TUser[];
  onFollow: (id: TUserId) => void;
  onUnFollow: (id: TUserId) => void;
  followingInProgress: TUserId[]; 
}