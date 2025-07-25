import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const TrashIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  />
);
