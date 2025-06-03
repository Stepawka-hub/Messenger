import { TUserId } from './user.types';

export type TPost = {
  id: number;
  userid: TUserId;
  message: string;
  username: string;
  avatar: string;
};

export type TMessage = {
  id: number;
  userid: TUserId;
  username: string;
  avatar: string;
  text: string;
};

export type TDialog = {
  id: number;
  username: string;
  avatar: string;
};
