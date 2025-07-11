import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const CheckIcon: FC<IconProps> = ({ size = 32, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="M17.517 7.957c.3.286.312.76.026 1.06l-6.667 7a.75.75 0 0 1-1.086 0l-3.333-3.5a.75.75 0 1 1 1.086-1.034l2.79 2.93l6.124-6.43a.75.75 0 0 1 1.06-.026"
    {...props}
  />
);
