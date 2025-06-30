import clsx from "clsx";
import { FC } from "react";
import s from "../styles/icons.module.css";
import { IconProps } from "../types";

export const FilterIcon: FC<IconProps> = ({ className, size = 24 }) => (
  <svg
    className={clsx(s.icon, className)}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="none"
    fill="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path fill="none" stroke="none" d="M0 0h24v24H0z" />
    <path d="M3 4A1 1 0 0 1 4 3H20A1 1 0 0 1 21 4V7L14 14V17L10 21V14L3 7V4" />
  </svg>
);
