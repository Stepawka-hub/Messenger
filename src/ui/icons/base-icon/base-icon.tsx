import clsx from "clsx";
import { FC } from "react";
import s from "./base-icon.module.css";
import { BaseIconProps } from "./type";

export const BaseIcon: FC<BaseIconProps> = ({
  className,
  size = 24,
  path,
  fill,
  viewBox = "0 0 21 21",
  ...props
}) => (
  <svg
    className={clsx(s.icon, className)}
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={path} fill={fill || "currentColor"} {...props} />
  </svg>
);
