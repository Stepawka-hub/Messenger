import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const CrossIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 24 24"
    path="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z"
    {...props}
  />
);
