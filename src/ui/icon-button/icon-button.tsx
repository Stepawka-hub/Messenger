import { FC } from "react";
import { Button } from "@ui/button";
import { IconButtonProps } from "./types";
import clsx from "clsx";
import s from "./icon-button.module.css";

export const IconButton: FC<IconButtonProps> = ({
  className,
  extraClass,
  ...props
}) => (
  <Button className={className || clsx(s.iconButton, extraClass)} {...props} />
);
