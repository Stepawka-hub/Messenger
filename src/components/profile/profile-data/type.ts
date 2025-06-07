import { TProfile } from '@types'

export type ProfileDataProps = {
  isOwner: boolean;
  profile: TProfile;
  status: string;
  updateUserStatus: (s: string) => void;
}