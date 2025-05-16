import { TUserData } from "src/types";

export const userDefault: TUserData = {
  id: -1,
  login: "None",
  email: "None",
  photos: {
    large: "/images/default-avatar.png",
    small: "/images/default-avatar.png",
  },
} as const;
