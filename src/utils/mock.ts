import avatarOrange from "@images/avatar_orange.jpg";
import avatarBlack from "@images/black.png";
import { TDialog, TPost } from "@types";

export const mockDialogs: TDialog[] = [
  {
    id: 1,
    username: "Stepawka",
    avatar: avatarBlack,
  },
  {
    id: 2,
    username: "Maxim",
    avatar: avatarOrange,
  },
  {
    id: 3,
    username: "Denis",
    avatar: avatarBlack,
  },
  {
    id: 4,
    username: "Alexander",
    avatar: avatarBlack,
  },
  {
    id: 5,
    username: "Ruslan",
    avatar: avatarBlack,
  },
];

export const mockPosts: TPost[] = [
  {
    id: 1,
    userid: 1,
    message: "Привет! - Post 1",
    username: "Stepawka",
    avatar: avatarBlack,
  },
  {
    id: 2,
    userid: 1,
    message: "Привет! - Post 2",
    username: "Stepawka",
    avatar: avatarBlack,
  },
];
