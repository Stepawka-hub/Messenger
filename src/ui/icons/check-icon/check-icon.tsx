import { FC } from "react";
import { IconProps } from "../types";
import { BaseIcon } from "../base-icon";

export const CheckIcon: FC<IconProps> = ({ size = 32, ...props }) => (
  <BaseIcon
    size={size}
    viewBox="0 0 16 16"
    path="M12.782 4.721a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0l-2.502-2.5A.75.75 0 0 1 4.28 8.22l1.971 1.97 5.47-5.469a.75.75 0 0 1 1.06 0Z"
    {...props}
  />
);