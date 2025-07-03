import { FC } from "react";
import { BaseIcon } from "../base-icon";
import { IconProps } from "../types";

export const FilterIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="M3 4A1 1 0 0 1 4 3H20A1 1 0 0 1 21 4V7L14 14V17L10 21V14L3 7V4"
    {...props}
  />
);
