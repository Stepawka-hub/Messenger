import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const DoubleCheckIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 12 12"
    path="m1 6l2.5 2.5l5-5m-2 5l5-5"
    fill='none'
    stroke='currentColor'
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);
