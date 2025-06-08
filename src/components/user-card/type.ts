import { TFindFriendUser, TUserId } from "src/types";

export type UserCardProps = {
  user: TFindFriendUser;
  followToUser: (id: TUserId) => void;
  unfollowFromUser: (id: TUserId) => void;
  followingInProgress: boolean;
};
