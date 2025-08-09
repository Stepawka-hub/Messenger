import { TContacts, TUserData } from "@types";

export const BASE_UPDATE_TIME = 60 * 1000;
export const POLLING_INTERVAL = 600 * 1000;

// Для веб-сокетов, временное решение
export const MESSAGE_SCROLL_DELAY_MS = 500;

export const MAX_MESSAGE_LENGTH = 512;
export const MAX_CHAT_MESSAGE_LENGTH = 100;

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

export const CONTACT_ORDER: (keyof TContacts)[] = [
  "github",
  "vk",
  "facebook",
  "instagram",
  "twitter",
] as const;
