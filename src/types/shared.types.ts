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

export type TPhotos = {
  small: string | null;
  large: string | null;
};

export type TLocation = {
  country: string;
  city: string;
};

export type TContacts = {
  vk: string;
  facebook: string;
  twitter: string;
  instagram: string;
  github: string;
};
