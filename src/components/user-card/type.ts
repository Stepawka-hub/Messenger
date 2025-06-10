import { TSocialUser, TUserId } from "@types";

export type UserCardProps = {
  user: TSocialUser;
  followToUser: (id: TUserId) => void;
  unfollowFromUser: (id: TUserId) => void;
  followingInProgress: boolean;
};
