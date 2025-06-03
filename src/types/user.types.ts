import { TPhotos } from './shared.types';

export type TUserId = number;

export type TUser = {
  id: TUserId;
  name: string;
  status?: string;
};

// Auth Data
export type TAuthUserData = {
  id: TUserId;
  login: string;
  email: string;
};

export type TUserData = TAuthUserData & {
  photos: TPhotos;
};

// Profile
export type TProfile = {
  id: TUserId;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos: TPhotos;
};