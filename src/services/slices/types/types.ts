import {
  TChatMessage,
  TDialog,
  TErrorMessage,
  TMessage,
  TProfile,
  TSocialUser,
  TSocketStatus,
  TToastWithKey,
  TUserData,
  TUserFilter,
  TUserId,
} from "@types";

export type TAppState = {
  initialized: boolean;
};

export type TToastState = {
  toasts: TToastWithKey[];
};

export type TUsersState = {
  users: TSocialUser[];
  isLoading: boolean;
  followingInProgressIds: TUserId[];
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
  loading: {
    isGettingProfile: boolean;
    isUpdatingProfile: boolean;
    isUpdatingPhoto: boolean;
    isUpdatingStatus: boolean;
  };
  errors: {
    fetchProfileError: TErrorMessage;
  }
};

export type TAuthState = {
  user: TUserData | null;
  isAuth: boolean;
  captchaUrl: string | null;
  loading: {
    isGettingUserData: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
  };
  errors: {
    loginError: TErrorMessage;
  };
};

export type TDialogsState = {
  dialogs: TDialog[];
  messages: TMessage[];
  loading: {
    isGettingDialogs: boolean;
    isStartingDialog: boolean;
    isGettingMessages: boolean;
    isSendingMessage: boolean;
  };
};

export type TChatState = {
  status: TSocketStatus;
  messages: TChatMessage[];
};

export type TSetIsFollowingPayload = {
  userid: TUserId;
  followingInProgress: boolean;
};

export type TSetFollowedPayload = {
  userid: TUserId;
  status: boolean;
};
