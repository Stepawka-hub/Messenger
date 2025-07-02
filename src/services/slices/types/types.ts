import {
  TChatMessage,
  TDialog,
  TModal,
  TProfile,
  TSocialUser,
  TSocketStatus,
  TUserData,
  TUserFilter,
  TUserId,
} from "@types";

export type TAppState = {
  initialized: boolean;
  modal: TModal;
};

export type TUsersState = {
  users: TSocialUser[];
  isLoading: boolean;
  followingInProgress: number[];
  pagination: {
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
  };
  searchQuery: string;
  filter: TUserFilter;
};

export type TProfileState = {
  profile: TProfile | null;
  status: string;
  isLoadingProfile: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPhoto: boolean;
};

export type TAuthState = {
  user: TUserData | null;
  isLoading: boolean;
  isAuth: boolean;
  captchaUrl: string | null;
  loginError: string | null;
  isLoggingIn: boolean;
};

export type TDialogsState = {
  dialogs: TDialog[];
  messages: TChatMessage[];
  status: TSocketStatus;
  loading: {
    dialogs: boolean;
    messages: boolean;
  };
  error: {
    dialogs: string | null;
    messages: string | null;
  };
};

export type TSetIsFollowingPayload = {
  userid: TUserId;
  followingInProgress: boolean;
};

export type TSetFollowedPayload = {
  userid: TUserId;
  status: boolean;
};
