export type TUserId = {
  id: number;
};

export type TUser = TUserId & {
  name: string;
  status?: string;
};

export type TAuthUserData = TUserId & {
  login: string;
  email: string;
};

export type TProfile = TUserId & {
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
}

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

export type TPost = {
  postid: number;
  userid: number;
  message: string;
  username: string;
  avatar: string;
};
