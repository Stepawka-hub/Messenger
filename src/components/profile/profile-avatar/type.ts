import { TPhotos } from "@types";
import { WithOwnerProps } from "@components/profile";

export type ProfileAvatarProps = WithOwnerProps & {
  photos: TPhotos;
};
