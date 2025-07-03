import { FC } from "react";
import { BaseIcon } from "../base-icon";
import { IconProps } from "../types";

export const LeftArrowIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="M17 11H9.414l2.293-2.293a.999.999 0 1 0-1.414-1.414L5.586 12l4.707 4.707a.997.997 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L9.414 13H17a1 1 0 0 0 0-2z"
    {...props}
  />
);
