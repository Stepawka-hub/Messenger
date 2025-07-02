import { TProfile, TUserId } from "@types";

export type ProfileInfoProps = {
  id: TUserId;
  isOwner: boolean;
  profile: TProfile;
};
