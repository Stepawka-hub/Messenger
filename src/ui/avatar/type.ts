import { HTMLAttributes } from "react";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  image: string | null;
  className?: string;
  size?: "small" | "medium" | "large";
};
