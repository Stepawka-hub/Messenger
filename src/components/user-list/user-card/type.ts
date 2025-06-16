import { TSocialUser, TUserId } from "@types";

export type UserCardProps = {
  user: TSocialUser;
  followingInProgress: boolean;
  followToUser: (id: TUserId) => void;
  unfollowFromUser: (id: TUserId) => void;
};
