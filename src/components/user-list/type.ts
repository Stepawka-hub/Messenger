import { TSocialUser, TUserId } from "@types";

export type UserListProps = {
  currentUserId: TUserId | null;
  users: TSocialUser[];
  onFollow: (id: TUserId) => void;
  onUnFollow: (id: TUserId) => void;
  followingInProgress: TUserId[];
};
