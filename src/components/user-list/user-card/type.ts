import { TSocialUser, TUserId } from "@types";

export type UserCardProps = {
  user: TSocialUser;
  isCurrentUser: boolean;
  followingInProgress: boolean;
  followToUser: (id: TUserId) => void;
  unfollowFromUser: (id: TUserId) => void;
};
