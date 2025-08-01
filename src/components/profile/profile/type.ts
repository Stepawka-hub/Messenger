import { TProfile, TUserId } from "@types";

export type ProfileProps = {
  id: TUserId;
  isOwner: boolean;
  profile: TProfile;
};
