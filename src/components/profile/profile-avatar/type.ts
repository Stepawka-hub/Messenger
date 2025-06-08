import { TPhotos } from '@types';

export type ProfileAvatarProps = {
  isOwner: boolean;
  photos: TPhotos;
  isUpdating: boolean;
  onUpdatePhoto: (photo: File) => void;
}