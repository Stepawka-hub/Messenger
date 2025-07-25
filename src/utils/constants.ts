import { TContacts, TUserData } from "@types";

export const BASE_UPDATE_TIME = 60 * 1000;
export const POLLING_INTERVAL = 600 * 1000;

export const userDefault: TUserData = {
  id: -1,
  login: "None",
  email: "None",
  photos: {
    large: "/images/default-avatar.png",
    small: "/images/default-avatar.png",
  },
} as const;

export const contactNames: TContacts = {
  vk: "VK",
  facebook: "Facebook",
  twitter: "Twitter",
  instagram: "Instagram",
  github: "GitHub",
} as const;
