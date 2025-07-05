import { TUserId } from "@types";
import { ButtonHTMLAttributes } from "react";

export type FollowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  userId: TUserId;
  followed: boolean;
};
