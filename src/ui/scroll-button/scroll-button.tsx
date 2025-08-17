import { FC } from "react";
import { ScrollButtonProps } from "./types";
import { IconButton } from "@ui/icon-button";
import { LeftArrowIcon } from "@icons";
import s from "./scroll-button.module.css";

export const ScrollButton: FC<ScrollButtonProps> = ({ onClick }) => {
  return (
    <IconButton extraClass={s.scrollButton} onClick={onClick}>
      <LeftArrowIcon />
    </IconButton>
  );
};
