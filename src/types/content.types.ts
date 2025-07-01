import { TUserId } from './user.types';

export type TPost = {
  id: number;
  userid: TUserId;
  message: string;
  username: string;
  avatar: string;
};

export type TChatMessage = {
  id: number;
  userId: TUserId;
  userName: string;
  message: string;
  photo: string;
};

export type TDialog = {
  id: number;
  username: string;
  avatar: string;
};
