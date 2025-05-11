export type TUserId = number;

export type TUser = {
  id: TUserId;
  name: string;
  status?: string;
};

export type TAuthUserData = {
  id: TUserId;
  login: string;
  email: string;
};

export type TUserData = TAuthUserData & {
  photos: TPhotos;
}

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

export type TPhotos = {
  small: string | null;
  large: string | null;
};

//
export type TModal = {
  title: string;
  text: string;
  delay: number;
  isOpen: boolean;
};

export type TPagination = {
  currentPage: number;
  pageSize: number;
};

//
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

export type TFriend = TDialog;