import {
  TDialog,
  TFriend,
  TMessage,
  TModal,
  TPost,
  TProfile,
  TUser,
  TUserData,
  TUserId,
} from "src/types";

export type TAppState = {
  initialized: boolean;
  modal: TModal;
};

export type TFriendsState = {
  friends: TFriend[];
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
  user: TUserData | null;
  isLoading: boolean;
  isAuth: boolean;
  captchaUrl: string | null;
};

export type TDialogsState = {
  dialogs: TDialog[];
  messages: TMessage[];
};

export type TSetIsFollowingPayload = {
  userid: TUserId;
  followingInProgress: boolean;
};

export type TSetFollowePayload = {
  userid: TUserId;
  status: boolean;
}
