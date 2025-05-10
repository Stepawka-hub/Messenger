import { TModal, TPost, TProfile, TUser } from "src/types";

export type TAppState = {
  initialized: boolean;
  modal: TModal;
};

export type TFriendsState = {
  friends: [];
};

export type TUsersState = {
  users: TUser[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isLoading: boolean;
  followingInProgress: number[];
};

export type TProfileState = {
  profile: TProfile | null;
  status: string;
  posts: TPost[];
  isUpdatingPhoto: boolean;
};

export type TAuthState = {
  user: {
    id: null;
    login: null;
    email: null;
    photos: null;
  };
  isLoading: false;
  isAuth: false;
  captchaUrl: null;
};
