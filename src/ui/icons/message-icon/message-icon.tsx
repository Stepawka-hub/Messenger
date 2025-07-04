import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const MessageIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="m3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  />
);
