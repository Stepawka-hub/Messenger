import { FC } from "react";
import { IconProps } from "../types";
import clsx from "clsx";
import s from '../styles/icons.module.css';

export const LeftArrowIcon: FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    className={clsx(s.icon, className)}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17 11H9.414l2.293-2.293a.999.999 0 1 0-1.414-1.414L5.586 12l4.707 4.707a.997.997 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L9.414 13H17a1 1 0 0 0 0-2z"
    />
  </svg>
);
